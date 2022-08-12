import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Lecture } from './entities/lecture.entity';

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
