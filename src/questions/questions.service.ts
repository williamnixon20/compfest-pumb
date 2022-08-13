import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createQuestionDto: CreateQuestionDto) {
    return this.prisma.question.create({
      data: createQuestionDto,
    });
  }

  createAnswerByQuestionId(questionId: number, createAnswerDto: CreateAnswerDto) {
    return this.prisma.answer.create({
      data: {
        question_id: questionId,
        ...createAnswerDto
      }
    });
  }

  findAll() {
    return this.prisma.question.findMany({
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

  findOne(id: number) {
    return this.prisma.question.findUnique({
      where: { id },
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

  async findAnswerByQuestionId(QuestionId: number) {
    return this.prisma.answer.findUnique({
      where: { question_id: QuestionId }
    });
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return this.prisma.question.update({
      where: { id },
      data: updateQuestionDto,
    });
  }

  remove(id: number) {
    return this.prisma.question.delete({
      where: { id },
    });
  }
}
