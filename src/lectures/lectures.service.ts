import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';

@Injectable()
export class LecturesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLectureDto: CreateLectureDto) {
    return this.prisma.lecture.create({
      data: createLectureDto,
    });
  }

  findAll() {
    return this.prisma.lecture.findMany();
  }

  findOne(id: number) {
    return this.prisma.lecture.findUnique({
      where: { id },
    });
  }

  findResourcesByLectureId(lectureId: number) {
    return this.prisma.resource.findMany({
      where: { lecture_id: lectureId },
    });
  }

  update(id: number, updateLectureDto: UpdateLectureDto) {
    return this.prisma.lecture.update({
      where: { id },
      data: updateLectureDto,
    });
  }

  remove(id: number) {
    return this.prisma.lecture.delete({
      where: { id },
    });
  }
}
