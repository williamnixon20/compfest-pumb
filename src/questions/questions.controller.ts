import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
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
    @Request() req,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionsService.create(req.user, createQuestionDto);
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: Question })
  findOne(
    @Param('id') id: string,
  ) {
    return this.questionsService.findOne(id);
  }

  @ApiBearerAuth()
  @Get(':id/answer')
  @ApiOkResponse({ type: Answer })
  findAnswer(
    @Request() req,
    @Param('id') id: string,
  ) {
    return this.questionsService.findAnswer(req.user, id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: Question })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(req.user, id, updateQuestionDto);
  }

  @ApiBearerAuth()
  @Patch(':id/answer')
  @ApiOkResponse()
  updateCorrectAnswer(
    @Request() req,
    @Param('id') id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.questionsService.updateAnswer(req.user, id, updateAnswerDto);
  }

  @ApiBearerAuth()
  @Patch(':id/feedback')
  @ApiOkResponse()
  updateFeedback(
    @Request() req,
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.questionsService.updateFeedback(req.user, id, updateFeedbackDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: Question })
  remove(
    @Request() req,
    @Param('id') id: string,
  ) {
    return this.questionsService.remove(req.user, id);
  }
}
