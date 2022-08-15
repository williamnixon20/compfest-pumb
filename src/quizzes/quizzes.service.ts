import { Injectable } from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto'
import { FullQuiz } from './entities/full-quiz.entity';
import { QuizAttempt } from './entities/quiz-attempt.entity';
import { QuizQuestion } from './entities/quiz-question.entity';
import { Quiz } from './entities/quiz.entity';
import { Submission } from './entities/submission.entity';
import { UserAnswer } from './entities/user-answer.entity';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createQuizDto: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: createQuizDto,
    });
  }

  async createSubmission(user: User, quizId: number, createSubmissionDto: CreateSubmissionDto[]) {
    const score: number = await this.calculateScore(createSubmissionDto);

    return this.prisma.userOnQuiz.create({
      data: {
        user_id: user.id,
        quiz_id: quizId,
        score,
      },
    });
  }

  async calculateScore(createSubmissionDto: CreateSubmissionDto[]) {
    const totalQuestion: number = createSubmissionDto.length;
    let totalCorrectAnswer: number = 0;

    for (let answer of createSubmissionDto) {
      const { correct_id: correctOptionId } = await this.prisma.answer.findUnique({
        select: {
          correct_id: true,
        },
        where: {
          question_id: answer.question_id,
        }
      });

      if (answer.option_id === correctOptionId) {
        totalCorrectAnswer += 1;
      }
    }

    const score: number = (totalCorrectAnswer/totalQuestion)*100;
    return score;
  }

  async findAll(user: User) {
    const quizzes: Quiz[] = await this.prisma.quiz.findMany();

    if (user.role === UserRole.STUDENT) {
      let quizzesAttempt: QuizAttempt[];
      
      for (let quiz of quizzes) {
        const attempt: boolean = await this.checkAttempt(user.id, quiz.id);
        const quizAttempt: QuizAttempt = {...quiz, attempt};
        quizzesAttempt.push(quizAttempt);
      }
      return quizzesAttempt;
    }

    return quizzes;
  }

  async findOne(quizId: number, user: User) {
    const quiz: QuizQuestion = await this.prisma.quiz.findUnique({
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
      const quizAttempt: FullQuiz = {...quiz, attempt};
      return quizAttempt;
    }

    return quiz;
  }

  async checkAttempt(userId: number, quizId: number) {
    const totalAttempt: number = await this.prisma.userOnQuiz.count({
      where: { 
        user_id: userId,
        quiz_id: quizId,
      },
    });
    
    const isAttempt: boolean = totalAttempt > 0;
    return isAttempt;
  }

  async findSubmission(quizId: number, user: User) {
    const submission = await this.prisma.userOnQuiz.findUnique({
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
  }

  async checkAnswer(
    userAnswers: {question_id: number, option_id: number}[]
  ) {
    let checkedAnswers: UserAnswer[];

    for (let answer of userAnswers) {
      const { feedback, correct_id } = await this.prisma.answer.findUnique({
        where: {
          question_id: answer.question_id,
        },
        select: {
          feedback: true,
          correct_id: true,
        },
      });
      checkedAnswers.push({...answer, feedback, correct_id});
    }

    return checkedAnswers;
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
