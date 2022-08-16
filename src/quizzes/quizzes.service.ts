import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto'
import { Quiz } from './entities/quiz.entity';
import { Submission } from './entities/submission.entity';
import { UserAnswer } from './entities/user-answer.entity';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  create(user: User, createQuizDto: CreateQuizDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.quiz.create({
        data: createQuizDto,
      });
    } catch (err) {
      throw new BadRequestException("Can't create quiz!", err.message);
    }
  }

  async createSubmission(user: User, quizId: number, createSubmissionDto: CreateSubmissionDto[]) {
    if (user.role !== UserRole.STUDENT) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const score: number = await this.calculateScore(createSubmissionDto);
      return await this.prisma.submission.create({
        data: {
          user_id: user.id,
          quiz_id: quizId,
          score,
        },
      });
    } catch (err) {
      throw new BadRequestException("Failed to submit!", err.message);
    }
  }

  async findAll(user: User) {
    try {
      const quizzes: Quiz[] = await this.prisma.quiz.findMany();

      if (user.role === UserRole.STUDENT) {
        let quizzesAttempt: Quiz[];
        
        for (let quiz of quizzes) {
          const attempt: boolean = await this.checkAttempt(user.id, quiz.id);
          const quizAttempt: Quiz = {...quiz, attempt};
          quizzesAttempt.push(quizAttempt);
        }
        return quizzesAttempt;
      }

      return quizzes;
    } catch (err) {
      throw new BadRequestException("Can't fetch quiz!", err.message);
    }
  }

  async findOne(user: User, quizId: number) {
    try {
      const quiz: Quiz = await this.prisma.quiz.findUniqueOrThrow({
        where: {
          id: quizId,
        },
        include: {
          questions: {
            include: {
              options: true,
            }
          }
        }
      });
  
      if (user.role === UserRole.STUDENT) {
        const attempt: boolean = await this.checkAttempt(user.id, quizId);
        const quizAttempt: Quiz = {...quiz, attempt};

        return quizAttempt;
      }
  
      return quiz;
    } catch (err) {
      throw new BadRequestException("Can't fetch quiz!", err.message);
    }
  }

  async findSubmission(user: User, quizId: number) {
    if (user.role !== UserRole.STUDENT) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      const submission = await this.prisma.submission.findUniqueOrThrow({
        where: {
          user_id_quiz_id: {
            user_id: user.id,
            quiz_id: quizId,
          }
        },
        select: {
          id: true,
          user_id: true,
          quiz_id: true,
          score: true,
          answers: {
            select: {
              question_id: true,
              option_id: true,
            }
          }
        },
      });
  
      const userAnswers: UserAnswer[] = 
        await this.checkAnswer(submission.answers);
      const submissionWithFeedback: Submission =
        {...submission, answers: userAnswers};
  
      return submissionWithFeedback;
    } catch (err) {
      throw new BadRequestException("Can't fetch submission!", err.message);
    }
  }

  update(user: User, id: number, updateQuizDto: UpdateQuizDto) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.quiz.update({
        where: { id },
        data: updateQuizDto,
      });
    } catch (err) {
      throw new BadRequestException("Failed to update quiz!", err.message);
    }
  }

  remove(user: User, id: number) {
    if (user.role !== UserRole.TEACHER) {
      throw new ForbiddenException("You are not allowed to access this resource!");
    }

    try {
      return this.prisma.quiz.delete({
        where: { id },
      });
    } catch (err) {
      throw new BadRequestException("Failed to delete quiz!", err.message);
    }
  }

  async calculateScore(createSubmissionDto: CreateSubmissionDto[]) {
    const totalQuestion: number = createSubmissionDto.length;
    let totalCorrectAnswer: number = 0;

    for (let answer of createSubmissionDto) {
      const { correct_id: correctOptionId } = 
        await this.prisma.answer.findUniqueOrThrow({
          select: {
            correct_id: true,
          },
          where: {
            question_id: answer.question_id,
          }
        }
      );

      if (answer.option_id === correctOptionId) {
        totalCorrectAnswer += 1;
      }
    }

    const score: number = (totalCorrectAnswer/totalQuestion)*100;
    return score;
  }

  async checkAttempt(userId: number, quizId: number) {
    const totalAttempt: number = await this.prisma.submission.count({
      where: { 
        user_id: userId,
        quiz_id: quizId,
      },
    });
    
    const isAttempt: boolean = totalAttempt > 0;
    return isAttempt;
  }

  async checkAnswer(userAnswers: CreateSubmissionDto[]) {
    let checkedAnswers: UserAnswer[];

    for (let answer of userAnswers) {
      const { feedback, correct_id } = 
      await this.prisma.answer.findUniqueOrThrow({
          where: {
            question_id: answer.question_id,
          },
          select: {
            feedback: true,
            correct_id: true,
          },
        }
      );
      checkedAnswers.push({...answer, feedback, correct_id});
    }

    return checkedAnswers;
  }
}
