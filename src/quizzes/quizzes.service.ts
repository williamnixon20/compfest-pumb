import { Injectable } from '@nestjs/common';
import { Question } from 'src/questions/entities/question.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizzesService {
  create(createQuizDto: CreateQuizDto) {
    const quiz = new Quiz();
    return quiz;
  }

  findAll() {
    const quiz = new Quiz();
    return [quiz];
  }

  findOne(id: number) {
    const quiz = new Quiz();
    return quiz;
  }

  findQuestionsByQuizId(id: number) {
    const question = new Question(0, "", "", null, null);
    return [question];
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    const quiz = new Quiz();
    return quiz;
  }

  remove(id: number) {
    const quiz = new Quiz();
    return quiz;
  }
}
