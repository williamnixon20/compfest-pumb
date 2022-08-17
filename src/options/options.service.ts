import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@Injectable()
export class OptionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(user: User, createOptionDto: CreateOptionDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.option.create({
        data: createOptionDto,
      }); 
    } catch (err) {
      throw new BadRequestException("Can't create option!", err.message);
    }
  }

  findAll() {
    try {
      return this.prisma.option.findMany();  
    } catch (err) {
      throw new BadRequestException("Can't fetch option!", err.message);
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.option.findUniqueOrThrow({
        where: { id },
      }); 
    } catch (err) {
      throw new BadRequestException("Can't fetch option!", err.message);
    }
  }

  update(user: User, id: number, updateOptionDto: UpdateOptionDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.option.update({
        where: { id },
        data: updateOptionDto,
      }); 
    } catch (err) {
      throw new BadRequestException("Failed to update option!", err.message);
    }
  }

  remove(user: User, id: number) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.option.delete({
        where: { id },
      }); 
    } catch (err) {
      throw new BadRequestException("Failed to delete option!", err.message);
    }
  }
}
