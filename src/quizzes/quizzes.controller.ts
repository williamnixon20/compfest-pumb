import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
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
import { FullQuestion } from 'src/questions/entities/full-question.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Submission } from './entities/submission.entity';

@Controller('quizzes')
@ApiTags('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: Quiz })
  create(
    @Body() createQuizDto: CreateQuizDto,
  ) {
    return this.quizzesService.create(createQuizDto);
  }

  @ApiBearerAuth()
  @Post(':id/submission')
  @ApiCreatedResponse({ type: Submission })
  createQuizSubmission(
    @Param('id', ParseIntPipe) id: number,
    @Body() createSubmissionDto: CreateSubmissionDto,
  ) {
    return this.quizzesService.createSubmission(id, createSubmissionDto);
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
  @Get(':id/submission')
  @ApiOkResponse({ type: Submission })
  findQuizSubmission(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.quizzesService.findSubmission(id, req.user);
  }

  @ApiBearerAuth()
  @Get(':id/questions')
  @ApiOkResponse({ type: [FullQuestion] })
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
