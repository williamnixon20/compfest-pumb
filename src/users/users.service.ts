import { Injectable } from '@nestjs/common';
import { User, Prisma, UserRole, Status } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        status: true,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User | null> {
    data.password = await bcrypt.hash(data.password, 10);
    let status = {};
    if (data.role === UserRole.TEACHER) {
      status = {
        create: {
          verification_status: Status.VERIFYING,
          description: 'Hold on tight! We are verifying your account.',
        },
      };
    }
    return this.prisma.user.create({
      data: {
        ...data,
        status,
      },
      include: {
        status: true,
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User | null> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.delete({
      where,
    });
  }
}
