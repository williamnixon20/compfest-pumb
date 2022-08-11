import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Quiz } from './entities/quiz.entity';
import { Question } from 'src/questions/entities/question.entity';

@Controller('quizzes')
@ApiTags('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @ApiCreatedResponse({ type: Quiz})
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @Get()
  @ApiOkResponse({ type: Quiz, isArray: true })
  findAll() {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Quiz })
  findOne(@Param('id') id: string) {
    return this.quizzesService.findOne(+id);
  }

  @Get(':id/questions')
  @ApiOkResponse({ type: [Question] })
  findQuestionsByQuizId(@Param('id') id: string) {
    return this.quizzesService.findQuestionsByQuizId(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Quiz })
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Quiz })
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(+id);
  }
}
