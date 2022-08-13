import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Quiz } from './entities/quiz.entity';
import { Question } from 'src/questions/entities/question.entity';

@Controller('quizzes')
@ApiTags('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: Quiz})
  create(
    @Body() createQuizDto: CreateQuizDto,
  ) {
    return this.quizzesService.create(createQuizDto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: Quiz, isArray: true })
  findAll() {
    return this.quizzesService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: Quiz })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.quizzesService.findOne(id);
  }

  @ApiBearerAuth()
  @Get(':id/questions')
  @ApiOkResponse({ type: [Question] })
  findQuestionsByQuizId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.quizzesService.findQuestionsByQuizId(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: Quiz })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizzesService.update(id, updateQuizDto);
  }

  @ApiBearerAuth()

  @Delete(':id')
  @ApiOkResponse({ type: Quiz })
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.quizzesService.remove(id);
  }
}
