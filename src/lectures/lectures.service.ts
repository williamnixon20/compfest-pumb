import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';

@Injectable()
export class LecturesService {
  constructor(private readonly prisma: PrismaService) {}

  create(user: User, createLectureDto: CreateLectureDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.lecture.create({
        data: createLectureDto,
      });
    } catch (err) {
      throw new BadRequestException("Can't create lecture!", err.message);
    }
  }

  findAll() {
    try {
      return this.prisma.lecture.findMany();
    } catch (err) {
      throw new BadRequestException("Can't fetch lecture!", err.message);
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.lecture.findUniqueOrThrow({
        where: { id },
      });
    } catch (err) {
      throw new BadRequestException("Can't fetch lecture!", err.message);
    }
  }

  findResourcesByLectureId(lectureId: number) {
    try {
      return this.prisma.resource.findMany({
        where: { lecture_id: lectureId },
      });
    } catch (err) {
      throw new BadRequestException("Can't fetch lecture resources!", err.message);
    }
  }

  update(user: User, id: number, updateLectureDto: UpdateLectureDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.lecture.update({
        where: { id },
        data: updateLectureDto,
      });
    } catch (err) {
      throw new BadRequestException("Failed to update lecture!", err.message);
    }
  }

  remove(user: User, id: number) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.lecture.delete({
        where: { id },
      });
    } catch (err) {
      throw new BadRequestException("Failed to delete lecture!", err.message);
    }
  }
}
