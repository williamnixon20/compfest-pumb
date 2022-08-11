import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {
  create(createAnswerDto: CreateAnswerDto) {
    const answer = new Answer(0, createAnswerDto.content);
    return answer;
  }

  findAll() {
    const answer = new Answer(0, "Carnivora");
    return [answer];
  }

  findOne(id: number) {
    const answer = new Answer(id, "Herbivora");
    return answer;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const answer = new Answer(id, updateAnswerDto.content);
    return answer;
  }

  remove(id: number) {
    const answer = new Answer(id, "Omnivora");
    return answer;
  }
}
