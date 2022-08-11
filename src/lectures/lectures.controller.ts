import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Lecture } from './entities/lecture.entity';

@Controller('lectures')
@ApiTags('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @Post()
  @ApiCreatedResponse({ type: Lecture })
  create(@Body() createLectureDto: CreateLectureDto) {
    return this.lecturesService.create(createLectureDto);
  }

  @Get()
  @ApiOkResponse({ type: Lecture, isArray: true })
  findAll() {
    return this.lecturesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Lecture })
  findOne(@Param('id') id: string) {
    return this.lecturesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Lecture })
  update(@Param('id') id: string, @Body() updateLectureDto: UpdateLectureDto) {
    return this.lecturesService.update(+id, updateLectureDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Lecture })
  remove(@Param('id') id: string) {
    return this.lecturesService.remove(+id);
  }
}
