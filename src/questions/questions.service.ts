import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const question: Question = await this.prisma.question.create({
      data: createQuestionDto,
    });

    const { id:question_id } = question;
    this.prisma.answer.create({
      data: {
        question_id,
      },
    });

    return question;
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

  findAnswer(QuestionId: number) {
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

  updateAnswer(QuestionId: number, updateAnswerDto: UpdateAnswerDto) {
    return this.prisma.answer.update({
      where: { question_id: QuestionId },
      data: updateAnswerDto,
    });
  }

  updateFeedback(QuestionId: number, updateFeedback: UpdateFeedbackDto) {
    return this.prisma.answer.update({
      where: { question_id: QuestionId },
      data: updateFeedback,
    });
  }

  remove(id: number) {
    return this.prisma.question.delete({
      where: { id },
    });
  }
}
