import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Injectable()
export class ResourcesService {
  constructor(private readonly prisma: PrismaService) {}

  create(user: User, createResourceDto: CreateResourceDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.resource.create({
        data: createResourceDto,
      }); 
    } catch (err) {
      throw new BadRequestException("Can't create resource!", err.message);
    }
  }

  findAll() {
    try {
      return this.prisma.resource.findMany(); 
    } catch (err) {
      throw new BadRequestException("Can't fetch resource!", err.message);
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.resource.findUniqueOrThrow({
        where: { id },
      }); 
    } catch (err) {
      throw new BadRequestException("Can't fetch resource!", err.message);
    }
  }

  update(user: User, id: number, updateResourceDto: UpdateResourceDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.resource.update({
        where: { id },
        data: updateResourceDto,
      });
    } catch (err) {
      throw new BadRequestException("Failed to update resource!", err.message);
    }
  }

  remove(user: User, id: number) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.resource.delete({
        where: { id },
      });
    } catch (err) {
      throw new BadRequestException("Failed to delete resource!", err.message);
    }
  }
}
