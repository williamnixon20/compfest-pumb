import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Resource, User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Lecture } from './entities/lecture.entity';

@Injectable()
export class LecturesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, createLectureDto: CreateLectureDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const lecture: Lecture = await this.prisma.lecture.create({
        data: createLectureDto,
      });
      return lecture;
    } catch (err) {
      throw new BadRequestException("Can't create lecture!", err.message);
    }
  }

  findAll() {
    return this.prisma.lecture.findMany();
  }

  async findOne(id: number) {
    try {
      const lecture: Lecture = await this.prisma.lecture.findUniqueOrThrow({
        where: { id },
      });
      return lecture;
    } catch (err) {
      throw new BadRequestException("Can't fetch lecture!", err.message);
    }
  }

  async findResourcesByLectureId(lectureId: number) {
    try {
      const resources: Resource[] = await this.prisma.resource.findMany({
        where: { lecture_id: lectureId },
      });
      return resources;
    } catch (err) {
      throw new BadRequestException("Can't fetch lecture resources!", err.message);
    }
  }

  async update(user: User, id: number, updateLectureDto: UpdateLectureDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const lecture: Lecture = await this.prisma.lecture.update({
        where: { id },
        data: updateLectureDto,
      });
      return lecture;
    } catch (err) {
      throw new BadRequestException("Failed to update lecture!", err.message);
    }
  }

  async remove(user: User, id: number) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const lecture: Lecture = await this.prisma.lecture.delete({
        where: { id },
      });
      return lecture;
    } catch (err) {
      throw new BadRequestException("Failed to delete lecture!", err.message);
    }
  }
}
