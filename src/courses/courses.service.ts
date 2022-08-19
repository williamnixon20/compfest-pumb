import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Status, User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/course.dto';
import { AwsService } from 'src/aws/aws.service';
@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService, private awsService: AwsService) {}
  async create(data: any, file: Express.Multer.File, user: User) {
    // if (user.role !== UserRole.TEACHER)
    //   throw new UnauthorizedException(
    //     'You are not allowed to access this resource!',
    //   );
    const { categories, ...course } = data;
    const uploadedFileUrl = await this.awsService.upload(file);
    course['thumbnail_url'] = uploadedFileUrl;
    try {
      const courses = this.prisma.course.create({
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
      console.log(err);
      throw new BadRequestException("Can't create course!" + err.message);
    }
  }

  async findAll(courseName, categId, user) {
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
            id: +categId,
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
      return this.isEnrolledMapper([course], user)[0];
    } catch (err) {
      throw new BadRequestException("Can't fetch course!", err.message);
    }
  }

  findQuizzesByCourseId(id: string, user) {
    return this.prisma.quiz.findMany({
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
        created_at: "asc",
      },
    });
  }

  findLecturesByCourseId(id: string, user) {
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
        created_at: "asc",
      },
    });
  }

  async subscribe(id: string, user) {
    if (user.role !== UserRole.STUDENT)
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );
    try {
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

  // update(id: number, updateCourseDto: UpdateCourseDto) {
  //   const course = new Course();
  //   return course;
  // }

  // remove(id: number) {
  //   const course = new Course();
  //   return course;
  // }
}
