import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, createQuestionDto: CreateQuestionDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const question: Question = await this.prisma.question.create({
        data: {
          ...createQuestionDto,
          answer: {
            create: {}
          }
        },
        select: {
          id: true,
          statement: true,
          quiz_id: true,
        },
      });
      return question;
    } catch (err) {
      throw new BadRequestException("Can't create question!", err.message);
    }
  }

  async findOne(id: string) {
    try {
      const question: Question = await this.prisma.question.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          statement: true,
          quiz_id: true,
          options: {
            select: {
              id: true,
              content: true,
            }
          },
        },
      });
      return question;
    } catch (err) {
      throw new BadRequestException("Can't fetch question!", err.message);
    }
  }

  async findAnswer(user: User, QuestionId: string) {
    if (user.role === UserRole.STUDENT) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const answer: Answer = await this.prisma.answer.findUniqueOrThrow({
        where: { question_id: QuestionId }
      });
      return answer;
    } catch (err) {
      throw new BadRequestException("Can't fetch answer!", err.message);
    }
  }

  async update(user: User, id: string, updateQuestionDto: UpdateQuestionDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const question: Question = await this.prisma.question.update({
        where: { id },
        data: updateQuestionDto,
        select: {
          id: true,
          statement: true,
          quiz_id: true,
        },
      });
      return question;
    } catch (err) {
      throw new BadRequestException("Failed to update question!", err.message);
    }
  }

  async updateAnswer(user: User, QuestionId: string, updateAnswerDto: UpdateAnswerDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const answer: Answer = await this.prisma.answer.update({
        where: { question_id: QuestionId },
        data: updateAnswerDto,
      });
      return answer;
    } catch (err) {
      throw new BadRequestException("Failed to update answer!", err.message);
    }
  }

  async updateFeedback(user: User, QuestionId: string, updateFeedback: UpdateFeedbackDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const answer: Answer = await this.prisma.answer.update({
        where: { question_id: QuestionId },
        data: updateFeedback,
      });
      return answer;
    } catch (err) {
      throw new BadRequestException("Failed to update feedback!", err.message);
    }
  }

  async remove(user: User, id: string) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const question: Question = await this.prisma.question.delete({
        where: { id },
        select: {
          id: true,
          statement: true,
          quiz_id: true,
        },
      });
      return question;
    } catch (err) {
      throw new BadRequestException("Failed to delete question!", err.message);
    }
  }
}
