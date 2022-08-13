import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createQuizDto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: createQuizDto,
    });
  }

  findAll() {
    return this.prisma.quiz.findMany();
  }

  findOne(id: number) {
    return this.prisma.quiz.findUnique({
      where: { id },
    });
  }

  findQuestionsByQuizId(QuizId: number) {
    return this.prisma.question.findMany({
      where: { quiz_id: QuizId },
      include: {
        options: {
          select: {
            id: true,
            content: true,
          }
        },
      },
    });
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return this.prisma.quiz.update({
      where: { id },
      data: updateQuizDto,
    });
  }

  remove(id: number) {
    return this.prisma.quiz.delete({
      where: { id },
    });
  }
}
