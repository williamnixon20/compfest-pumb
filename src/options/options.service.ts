import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Option } from './entities/option.entity';

@Injectable()
export class OptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, createOptionDto: CreateOptionDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const option: Option = await this.prisma.option.create({
        data: createOptionDto,
      });
      return option;
    } catch (err) {
      throw new BadRequestException("Can't create option!", err.message);
    }
  }

  findAll() {
    return this.prisma.option.findMany();
  }

  async findOne(id: number) {
    try {
      const option: Option = await this.prisma.option.findUniqueOrThrow({
        where: { id },
      });
      return option;
    } catch (err) {
      throw new BadRequestException("Can't fetch option!", err.message);
    }
  }

  async update(user: User, id: number, updateOptionDto: UpdateOptionDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const option: Option = await this.prisma.option.update({
        where: { id },
        data: updateOptionDto,
      });
      return option;
    } catch (err) {
      throw new BadRequestException("Failed to update option!", err.message);
    }
  }

  async remove(user: User, id: number) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const option: Option = await this.prisma.option.delete({
        where: { id },
      });
      return option;
    } catch (err) {
      throw new BadRequestException("Failed to delete option!", err.message);
    }
  }
}
