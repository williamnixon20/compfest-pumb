import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Status, User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCourseDto, user: User) {
    if (user.role !== UserRole.TEACHER)
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );
    const { categories, ...course } = data;
    try {
      const courses = this.prisma.course.create({
        data: {
          ...course,
          categories: {
            connectOrCreate: categories.map((category) => {
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

  async findOne(id: number, user) {
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
      return this.isEnrolledMapper([course], user);
    } catch (err) {
      throw new BadRequestException("Can't fetch course!", err.message);
    }
  }

  findQuizzesByCourseId(id: number, user) {
    return this.prisma.quiz.findMany({
      where: {
        course: {
          id: id,
        },
      },
    });
  }

  findLecturesByCourseId(id: number, user) {
    return this.prisma.lecture.findMany({
      where: {
        course: {
          id: id,
        },
      },
    });
  }

  async subscribe(id: number, user) {
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
        teachers: {
          include: {
            course: true,
          },
        },
      };
    }
    if (user.role === UserRole.STUDENT) {
      studentQuery = {
        subscribers: {
          include: {
            course: true,
          },
        },
      };
    }
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: +user.id,
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          ...teacherQuery,
          ...studentQuery,
        },
      });
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
