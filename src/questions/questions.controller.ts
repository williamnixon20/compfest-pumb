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
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Question } from './entities/question.entity';
import { FullQuestion } from './entities/full-question.entity';
import { Answer } from './entities/answer.entity';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Controller('questions')
@ApiTags('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: Question })
  create(
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionsService.create(createQuestionDto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: FullQuestion, isArray: true })
  findAll() {
    return this.questionsService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: FullQuestion })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.questionsService.findOne(id);
  }

  @ApiBearerAuth()
  @Get(':id/answer')
  @ApiOkResponse({ type: Answer })
  findAnswer(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.questionsService.findAnswer(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: Question })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @ApiBearerAuth()
  @Patch(':id/answer')
  @ApiOkResponse()
  updateCorrectAnswer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.questionsService.updateAnswer(id, updateAnswerDto);
  }

  @ApiBearerAuth()
  @Patch(':id/feedback')
  @ApiOkResponse()
  updateFeedback(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.questionsService.updateFeedback(id, updateFeedbackDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: Question })
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.questionsService.remove(id);
  }
}
