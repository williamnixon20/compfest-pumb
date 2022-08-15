import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Course,
  CourseStatus,
  Status,
  User,
  UserRole,
  UserStatus,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStatusDto, UpdateStatusObject } from './dto/admin.dto';
@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  async findAllPendingCourse(user: User): Promise<Course[]> {
    if (user.role !== UserRole.ADMIN)
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );
    try {
      return await this.prisma.course.findMany({
        where: {
          course_status: {
            status: Status.VERIFYING,
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
        },
      });
    } catch (err) {
      throw new BadRequestException("Can't fetch course!", err.message);
    }
  }
  async findAllPendingTeacher(user: User): Promise<any> {
    if (user.role !== UserRole.ADMIN)
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );
    try {
      return await this.prisma.user.findMany({
        where: {
          status: {
            status: Status.VERIFYING,
          },
        },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          username: true,
          role: true,
          created_at: true,
          status: true,
        },
      });
    } catch (err) {
      throw new BadRequestException("Can't fetch course!", err.message);
    }
  }

  async updateCourse(data: UpdateStatusObject[], user: User) {
    if (user.role !== UserRole.ADMIN)
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );

    try {
      return await this.prisma.$transaction(
        data.map((data) => {
          return this.prisma.course.update({
            where: {
              id: +data.id,
            },
            data: {
              course_status: {
                update: {
                  status: data.status,
                  description: data.description,
                },
              },
            },
            include: {
              course_status: true,
            },
          });
        }),
      );
    } catch (err) {
      throw new BadRequestException("Can't fetch course!", err.message);
    }
  }

  async updateTeacher(data: UpdateStatusObject[], user: User) {
    if (user.role !== UserRole.ADMIN)
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );

    try {
      return await this.prisma.$transaction(
        data.map((data) => {
          return this.prisma.user.update({
            where: {
              id: +data.id,
            },
            data: {
              status: {
                update: {
                  status: data.status,
                  description: data.description,
                },
              },
            },
            include: {
              status: true,
            },
          });
        }),
      );
    } catch (err) {
      throw new BadRequestException("Can't fetch course!", err.message);
    }
  }
}
