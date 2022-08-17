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
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Quiz } from './entities/quiz.entity';
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
    @Request() req,
    @Body() createQuizDto: CreateQuizDto,
  ) {
    return this.quizzesService.create(req.user, createQuizDto);
  }

  @ApiBearerAuth()
  @Post(':id/submission')
  @ApiCreatedResponse({ type: Submission })
  @ApiBody({ type: [CreateSubmissionDto] })
  createQuizSubmission(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() createSubmissionDto: CreateSubmissionDto[],
  ) {
    return this.quizzesService.createSubmission(req.user, id, createSubmissionDto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: [Quiz] })
  findAll(
    @Request() req,
  ) {
    return this.quizzesService.findAll(req.user);
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: Quiz })
  findOne(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.quizzesService.findOne(req.user, id);
  }

  @ApiBearerAuth()
  @Get(':id/submission')
  @ApiOkResponse({ type: Submission })
  findQuizSubmission(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.quizzesService.findSubmission(req.user, id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: Quiz })
  update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuizDto: UpdateQuizDto,
  ) {
    return this.quizzesService.update(req.user, id, updateQuizDto);
  }

  @ApiBearerAuth()

  @Delete(':id')
  @ApiOkResponse({ type: Quiz })
  remove(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.quizzesService.remove(req.user, id);
  }
}
