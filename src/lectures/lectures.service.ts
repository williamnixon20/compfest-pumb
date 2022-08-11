import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { Lecture } from './entities/lecture.entity';

@Injectable()
export class LecturesService {
  create(createLectureDto: CreateLectureDto) {
    const lecture = new Lecture(0, createLectureDto.name, createLectureDto.description, createLectureDto.resource_url);
    return lecture;
  }

  findAll() {
    const lecture = new Lecture(0, "Google", "Search the world's information, including webpages, images, videos and more.", "www.google.com");
    return [lecture];
  }

  findOne(id: number) {
    const lecture = new Lecture(id, "Google", "Search the world's information, including webpages, images, videos and more.", "www.google.com");
    return lecture;
  }

  update(id: number, updateLectureDto: UpdateLectureDto) {
    const lecture = new Lecture(id, updateLectureDto.name, updateLectureDto.description, updateLectureDto.resource_url);
    return lecture;
  }

  remove(id: number) {
    const lecture = new Lecture(id, "Google", "Search the world's information, including webpages, images, videos and more.", "www.google.com");
    return lecture;
  }
}
