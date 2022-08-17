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
        data: createQuestionDto,
      });
  
      const { id:question_id } = question;
      await this.prisma.answer.create({
        data: {
          question_id,
        },
      });
  
      return question; 
    } catch (err) {
      throw new BadRequestException("Can't create question!", err.message);
    }
  }

  findAll() {
    try {
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
    } catch (err) {
      throw new BadRequestException("Can't fetch question!", err.message);
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.question.findUniqueOrThrow({
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
    } catch (err) {
      throw new BadRequestException("Can't fetch question!", err.message);
    }
  }

  findAnswer(user: User, QuestionId: number) {
    if (user.role === UserRole.STUDENT) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.answer.findUniqueOrThrow({
        where: { question_id: QuestionId }
      }); 
    } catch (err) {
      throw new BadRequestException("Can't fetch answer!", err.message);
    }
  }

  update(user: User, id: number, updateQuestionDto: UpdateQuestionDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.question.update({
        where: { id },
        data: updateQuestionDto,
      }); 
    } catch (err) {
      throw new BadRequestException("Failed to update question!", err.message);
    }
  }

  updateAnswer(user: User, QuestionId: number, updateAnswerDto: UpdateAnswerDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.answer.update({
        where: { question_id: QuestionId },
        data: updateAnswerDto,
      });
    } catch (err) {
      throw new BadRequestException("Failed to update answer!", err.message);
    }
  }

  updateFeedback(user: User, QuestionId: number, updateFeedback: UpdateFeedbackDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.answer.update({
        where: { question_id: QuestionId },
        data: updateFeedback,
      }); 
    } catch (err) {
      throw new BadRequestException("Failed to update feedback!", err.message);
    }
  }

  remove(user: User, id: number) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.question.delete({
        where: { id },
      }); 
    } catch (err) {
      throw new BadRequestException("Failed to delete question!", err.message);
    }
  }
}
