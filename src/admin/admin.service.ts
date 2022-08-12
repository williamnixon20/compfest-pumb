import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  CourseStatus,
  Status,
  User,
  UserRole,
  UserStatus,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  async findAllPendingCourse(user: User): Promise<CourseStatus[]> {
    if (user.role !== UserRole.ADMIN)
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );

    return await this.prisma.courseStatus.findMany({
      where: {
        OR: [{ status: Status.VERIFYING }],
      },
      include: {
        course: true,
      },
    });
  }
  async findAllPendingTeacher(user: User): Promise<UserStatus[]> {
    if (user.role !== UserRole.ADMIN)
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );
    return await this.prisma.userStatus.findMany({
      where: {
        OR: [{ status: Status.VERIFYING }],
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            username: true,
            role: true,
            created_at: true,
          },
        },
      },
    });
  }

  async updateCourse(id: number, data: any, user: User) {
    if (user.role !== UserRole.ADMIN)
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );

    return await this.prisma.course.update({
      where: {
        id: id,
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
  }

  async updateTeacher(id: number, data: any, user: User) {
    if (user.role !== UserRole.ADMIN)
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );
    return await this.prisma.user.update({
      where: {
        id: id,
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
  }
}
