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

@Controller('questions')
@ApiTags('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: Question})
  create(
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return this.questionsService.create(createQuestionDto);
  }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: Question, isArray: true })
  findAll() {
    return this.questionsService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: Question })
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.questionsService.findOne(id);
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
  @Delete(':id')
  @ApiOkResponse({ type: Question })
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.questionsService.remove(id);
  }
}
