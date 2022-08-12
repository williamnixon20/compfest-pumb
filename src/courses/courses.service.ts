import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Status, User, UserRole } from '@prisma/client';
import { Lecture } from 'src/lectures/entities/lecture.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

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
              description: 'Hold on tight! We are verifying your account.',
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

  async findAll() {
    try {
      return await this.prisma.course.findMany({
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
        },
      });
    } catch (err) {
      throw new BadRequestException("Can't fetch course!", err.message);
    }
  }

  findOne(id: number) {
    const course = new Course();
    return course;
  }

  findQuizzesByCourseId(id: number) {
    const quiz = new Quiz();
    return [quiz];
  }

  findLecturesByCourseId(id: number) {
    const lecture = new Lecture(0, '', '', '');
    return [lecture];
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

  update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = new Course();
    return course;
  }

  remove(id: number) {
    const course = new Course();
    return course;
  }
}
