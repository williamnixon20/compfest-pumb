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
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
  refs,
} from '@nestjs/swagger';
import { Quiz } from './entities/quiz.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Submission } from './entities/submission.entity';
import { QuizAttempt } from './entities/quiz-attempt.entity';
import { QuizQuestion } from './entities/quiz-question.entity';
import { FullQuiz } from './entities/full-quiz.entity';

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
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() createSubmissionDto: CreateSubmissionDto[],
  ) {
    return this.quizzesService.createSubmission(req.user, id, createSubmissionDto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        oneOf: [
          { $ref: getSchemaPath(Quiz) },
          { $ref: getSchemaPath(QuizAttempt) }
        ],
      },
    },
  })
  findAll(
    @Request() req,
  ) {
    return this.quizzesService.findAll(req.user);
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiExtraModels(FullQuiz, QuizQuestion)
  @ApiOkResponse({
    schema: {
      oneOf: refs(FullQuiz, QuizQuestion)
    },
  })
  findOne(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.quizzesService.findOne(id, req.user);
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
