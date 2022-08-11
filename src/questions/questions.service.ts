import { Injectable } from '@nestjs/common';
import { Answer } from '../answers/entities/answer.entity';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  create(createQuestionDto: CreateQuestionDto) {
    const statement = createQuestionDto.statement;
    const feedback = createQuestionDto.feedback;
    const expected_answer = new Answer(0, createQuestionDto.expected_answer);
    const answers = [expected_answer];
    const question = new Question(0, statement, feedback, expected_answer, answers);

    return question;
  }

  findAll() {
    const question = new Question(0, ...this.dummy());
    return [question];
  }

  findOne(id: number) {
    const question = new Question(id, ...this.dummy());
    return question;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const statement = updateQuestionDto.statement;
    const feedback = updateQuestionDto.feedback;
    const expected_answer = new Answer(0, updateQuestionDto.expected_answer);
    const answers = [expected_answer];
    const question = new Question(0, statement, feedback, expected_answer, answers);

    return question;
  }

  remove(id: number) {
    const question = new Question(id, ...this.dummy());
    return question;
  }

  dummy(): [string, string, Answer, Answer[]] {
    const statement = "Simplify the expression 3x + 2 + 5x + - 7.";
    const feedback = "(3 + 5)x + (2 - 7) = 8x - 5";
    const expected_answer = new Answer(0, "8x - 5");
    const answers = [expected_answer, new Answer(1, "8x + 5"), new Answer(2, "5x + 8")];

    return [statement, feedback, expected_answer, answers];
  }
}
