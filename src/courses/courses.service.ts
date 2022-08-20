import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Status, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AwsService } from 'src/aws/aws.service';
@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService, private awsService: AwsService) {}
  async create(data, file: Express.Multer.File, user) {
    if (
      user.role !== UserRole.TEACHER ||
      user.status.status !== Status.VERIFIED
    )
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );
    const { categories, ...course } = data;

    try {
      const uploadedFileUrl = await this.awsService.upload(file);
      course['thumbnail_url'] = uploadedFileUrl;

      const courses = await this.prisma.course.create({
        data: {
          ...course,
          categories: {
            connectOrCreate: JSON.parse(categories).map((category) => {
              return {
                where: { name: category.name },
                create: { name: category.name },
              };
            }),
          },
          teacher: { create: { user_id: user.id } },
          course_status: {
            create: {
              status: Status.VERIFYING,
              description: 'Hold on tight! We are verifying your course.',
            },
          },
        },
        include: {
          categories: true,
          teacher: {
            include: {
              user: {
                select: {
                  username: true,
                  email: true,
                },
              },
            },
          },
          course_status: true,
        },
      });
      return courses;
    } catch (err) {
      throw new BadRequestException("Can't create course!" + err.message);
    }
  }

  async findAllVerified(courseName, categId, user) {
    let queryCourse = {};
    let queryCateg = {};
    if (courseName) {
      queryCourse = {
        title: {
          contains: courseName,
        },
      };
    }

    if (categId) {
      queryCateg = {
        categories: {
          some: {
            id: categId,
          },
        },
      };
    }
    try {
      const courses = await this.prisma.course.findMany({
        where: {
          ...queryCourse,
          ...queryCateg,
          course_status: {
            status: Status.VERIFIED,
          },
        },
        include: {
          categories: true,
          teacher: {
            include: {
              user: {
                select: {
                  username: true,
                  email: true,
                },
              },
            },
          },
          course_status: true,
          _count: {
            select: {
              followers: true,
            },
          },
          followers: {
            where: {
              user_id: user.id,
            },
          },
        },
      });

      return this.isEnrolledMapper(courses, user);
    } catch (err) {
      throw new BadRequestException("Can't fetch course!", err.message);
    }
  }

  async findOne(id: string, user) {
    try {
      const course = await this.prisma.course.findUnique({
        where: {
          id: id,
        },
        include: {
          categories: true,
          teacher: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
            },
          },
          course_status: true,
          _count: {
            select: {
              followers: true,
            },
          },
          followers: {
            where: {
              user_id: user.id,
            },
          },
        },
      });

      if (!this.validateAccess(course, user))
        throw new UnauthorizedException(
          'You are not allowed to access this resource!',
        );

      return this.isEnrolledMapper([course], user)[0];
    } catch (err) {
      throw new BadRequestException("Can't fetch course!", err.message);
    }
  }

  async findQuizzesByCourseId(id: string, user) {
    try {
      await this.findOne(id, user);
      return await this.prisma.quiz.findMany({
        where: {
          course: {
            id: id,
          },
        },
        select: {
          id: true,
          title: true,
        },
        orderBy: {
          created_at: 'asc',
        },
      });
    } catch (err) {
      throw new BadRequestException("Can't fetch course!", err.message);
    }
  }

  async findLecturesByCourseId(id: string, user) {
    try {
      await this.findOne(id, user);
      return this.prisma.lecture.findMany({
        where: {
          course: {
            id: id,
          },
        },
        select: {
          id: true,
          title: true,
        },
        orderBy: {
          created_at: 'asc',
        },
      });
    } catch (err) {
      throw new BadRequestException("Can't fetch course!", err.message);
    }
  }

  async subscribe(id: string, user) {
    if (user.role !== UserRole.STUDENT)
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );
    try {
      await this.findOne(id, user);
      const course = await this.prisma.course.update({
        where: {
          id: id,
        },
        data: { followers: { create: { user_id: user.id, progress: 0 } } },
      });
      return course;
    } catch (error) {
      throw new BadRequestException('Failed to subscribe!', error.message);
    }
  }

  async findCoursesByUser(user) {
    if (user.role === UserRole.ADMIN)
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );

    let teacherQuery = {};
    let studentQuery = {};

    if (user.role === UserRole.TEACHER) {
      teacherQuery = {
        teacher: {
          some: {
            user_id: user.id,
          },
        },
      };
    }
    if (user.role === UserRole.STUDENT) {
      studentQuery = {
        followers: {
          some: {
            user_id: user.id,
          },
        },
      };
    }
    try {
      const courses = await this.prisma.course.findMany({
        where: {
          ...teacherQuery,
          ...studentQuery,
        },
        include: {
          categories: true,
          teacher: {
            include: {
              user: {
                select: {
                  username: true,
                  email: true,
                },
              },
            },
          },
          course_status: true,
          _count: {
            select: {
              followers: true,
            },
          },
          followers: {
            where: {
              user_id: user.id,
            },
          },
        },
      });
      return this.isEnrolledMapper(courses, user);
    } catch (err) {
      throw new BadRequestException("Can't fetch course!", err.message);
    }
  }

  isEnrolledMapper(courses, user) {
    const isStudent = user.role === UserRole.STUDENT;
    return courses.map((course) => {
      if (isStudent && course['followers'].length === 0) {
        course['enrolled'] = false;
      } else {
        course['enrolled'] = true;
      }
      return course;
    });
  }

  async checkCourseCreator(userId: string, courseId: string) {
    const teachersOnCourses = await this.prisma.teachersOnCourses.findUnique({
      where: {
        course_id_user_id: {
          user_id: userId,
          course_id: courseId,
        },
      },
    });

    return teachersOnCourses !== null;
  }

  validateAccess(course, user) {
    if (user.role === UserRole.TEACHER) {
      if (course['teacher'][0]['user']['id'] !== user.id) return false;
    } else if (user.role === UserRole.STUDENT) {
      if (course['course_status']['status'] !== Status.VERIFIED) return false;
    }
    return true;
  }
}
