import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/auth/jwt-auth';
import { Lecture } from 'src/lectures/entities/lecture.entity';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { CoursesService } from './courses.service';
import { CreateCourseDto, idParamsDto, ParamsDto } from './dto/course.dto';
import { Course } from './entities/course.entity';

@Controller('courses')
@ApiTags('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ type: Course })
  create(
    @Request() req,
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.coursesService.create(createCourseDto, file, req.user);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: Course, isArray: true })
  findAll(@Query() params: ParamsDto, @Request() req) {
    return this.coursesService.findAll(
      params.courseName,
      params.categoryId,
      req.user,
    );
  }

  @Get('/me')
  @ApiBearerAuth()
  findCourseByUser(@Request() req) {
    return this.coursesService.findCoursesByUser(req.user);
  }

  @Post(':id/subscribe')
  @ApiBearerAuth()
  subscribe(@Request() req, @Param() params: idParamsDto) {
    return this.coursesService.subscribe(+params.id, req.user);
  }

  @Get(':id')
  @ApiOkResponse({ type: Course })
  @ApiBearerAuth()
  findOne(@Param() params: idParamsDto, @Request() req) {
    return this.coursesService.findOne(+params.id, req.user);
  }

  @Get(':id/quizzes')
  @ApiOkResponse({ type: [Quiz] })
  @ApiBearerAuth()
  @Public()
  findQuizzesByCourseId(@Param() params: idParamsDto, @Request() req) {
    return this.coursesService.findQuizzesByCourseId(+params.id, req.user);
  }

  @Get(':id/lectures')
  @ApiOkResponse({ type: [Lecture] })
  @ApiBearerAuth()
  findLecturesByCourseId(@Param() params: idParamsDto, @Request() req) {
    return this.coursesService.findLecturesByCourseId(+params.id, req.user);
  }

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
