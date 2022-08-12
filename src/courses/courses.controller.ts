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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Lecture } from 'src/lectures/entities/lecture.entity';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Controller('courses')
@ApiTags('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Course })
  create(@Request() req, @Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto, req.user);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: Course, isArray: true })
  findAll() {
    return this.coursesService.findAll();
  }

  @Post(':id/subscribe')
  @ApiBearerAuth()
  subscribe(@Request() req, @Param('id') id: string) {
    return this.coursesService.subscribe(+id, req.user);
  }

  // @Get(':id')
  // @ApiOkResponse({ type: Course })
  // findOne(@Param('id') id: string) {
  //   return this.coursesService.findOne(+id);
  // }

  // @Get(':id/quizzes')
  // @ApiOkResponse({ type: [Quiz] })
  // findQuizzesByCourseId(@Param('id') id: string) {
  //   return this.coursesService.findQuizzesByCourseId(+id);
  // }

  // @Get(':id/lectures')
  // @ApiOkResponse({ type: [Lecture] })
  // findLecturesByCourseId(@Param('id') id: string) {
  //   return this.coursesService.findLecturesByCourseId(+id);
  // }

  // @Patch(':id')
  // @ApiOkResponse({ type: Course })
  // update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
  //   return this.coursesService.update(+id, updateCourseDto);
  // }

  // @Delete(':id')
  // @ApiOkResponse({ type: Course })
  // remove(@Param('id') id: string) {
  //   return this.coursesService.remove(+id);
  // }
}
