import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Resource } from 'src/resources/entities/resource.entity';
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
        select: {
          id: true,
          title: true,
          course_id: true,
        },
      });
      return lecture;
    } catch (err) {
      throw new BadRequestException("Can't create lecture!", err.message);
    }
  }

  findAll() {
    return this.prisma.lecture.findMany({
      select: {
        id: true,
        title: true,
        course_id: true,
      },
    });
  }

  async findOne(id: string) {
    try {
      const lecture: Lecture = await this.prisma.lecture.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          title: true,
          course_id: true,
        },
      });
      return lecture;
    } catch (err) {
      throw new BadRequestException("Can't fetch lecture!", err.message);
    }
  }

  async findResourcesByLectureId(lectureId: string) {
    try {
      const resources: Resource[] = await this.prisma.resource.findMany({
        where: { lecture_id: lectureId },
        select: {
          id: true,
          name: true,
          type: true,
          url: true,
          lecture_id: true,
        },
        orderBy: {
          created_at: "asc",
        }
      });
      return resources;
    } catch (err) {
      throw new BadRequestException("Can't fetch lecture resources!", err.message);
    }
  }

  async update(user: User, id: string, updateLectureDto: UpdateLectureDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const lecture: Lecture = await this.prisma.lecture.update({
        where: { id },
        data: updateLectureDto,
        select: {
          id: true,
          title: true,
          course_id: true,
        },
      });
      return lecture;
    } catch (err) {
      throw new BadRequestException("Failed to update lecture!", err.message);
    }
  }

  async remove(user: User, id: string) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const lecture: Lecture = await this.prisma.lecture.delete({
        where: { id },
        select: {
          id: true,
          title: true,
          course_id: true,
        },
      });
      return lecture;
    } catch (err) {
      throw new BadRequestException("Failed to delete lecture!", err.message);
    }
  }
}
