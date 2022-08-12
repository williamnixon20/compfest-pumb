import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  Course,
  CourseStatus,
  prisma,
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
        OR: [{ status: Status.ASSESSING }, { status: Status.VERIFYING }],
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
        OR: [{ status: Status.ASSESSING }, { status: Status.VERIFYING }],
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });
  }

  updateCourse(id: number, data: any, user: User) {
    if (user.role !== UserRole.ADMIN)
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );
  }

  updateTeacher(id: number, data: any, user: User) {
    if (user.role !== UserRole.ADMIN)
      throw new UnauthorizedException(
        'You are not allowed to access this resource!',
      );
  }
}
