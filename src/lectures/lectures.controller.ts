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
import { LecturesService } from './lectures.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Lecture } from './entities/lecture.entity';
import { Resource } from 'src/resources/entities/resource.entity';

@Controller('lectures')
@ApiTags('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @ApiBearerAuth()
  @Post()
  @ApiCreatedResponse({ type: Lecture })
  create(
    @Request() req,
    @Body() createLectureDto: CreateLectureDto,
  ) {
    return this.lecturesService.create(req.user, createLectureDto);
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: Lecture })
  findOne(
    @Param('id') id: string,
  ) {
    return this.lecturesService.findOne(id);
  }

  @ApiBearerAuth()
  @Get(':id/resources')
  @ApiOkResponse({ type: Resource, isArray: true })
  findResourcesByLectureId(
    @Param('id') id: string,
  ) {
    return this.lecturesService.findResourcesByLectureId(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: Lecture })
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateLectureDto: UpdateLectureDto,
  ) {
    return this.lecturesService.update(req.user, id, updateLectureDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: Lecture })
  remove(
    @Request() req,
    @Param('id') id: string,
  ) {
    return this.lecturesService.remove(req.user, id);
  }
}
