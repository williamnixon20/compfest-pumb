import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { OptionQuestion } from './entities/option-question.entity';
import { Submission } from './entities/submission.entity';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createQuizDto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: createQuizDto,
    });
  }

  async createSubmission(quizId: number, createSubmissionDto: CreateSubmissionDto) {
    const { user_id, answers } = createSubmissionDto;
    const score: number = await this.calculateScore(answers);

    return this.prisma.userOnQuiz.create({
      data: {
        user_id,
        quiz_id: quizId,
        score,
      },
    });
  }

  async calculateScore(answers: OptionQuestion[]) {
    const totalQuestion: number = answers.length;
    let totalCorrectAnswer: number = 0;

    for (let answer of answers) {
      const { option_id: correctOptionId } = await this.prisma.answer.findUnique({
        select: {
          option_id: true,
        },
        where: {
          question_id: answer.question_id,
        }
      });

      if (answer.option_id === correctOptionId) {
        totalCorrectAnswer += 1;
      }
    }

    const score: number = totalCorrectAnswer/totalQuestion;
    return score;
  }

  findAll() {
    return this.prisma.quiz.findMany();
  }

  findOne(id: number) {
    return this.prisma.quiz.findUnique({
      where: { id },
    });
  }

  async findSubmission(quizId: number, user: User) {
    const userId: number = user.id;
    const submission: Submission = await this.prisma.userOnQuiz.findUnique({
      where: {
        user_id_quiz_id: {
          user_id: userId,
          quiz_id: quizId,
        }
      },
      include: {
        answers: {
          select: {
            question_id: true,
            option_id: true,
          }
        }
      },
    });

    return submission;
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
