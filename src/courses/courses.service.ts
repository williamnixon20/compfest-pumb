import { Injectable } from '@nestjs/common';
import { Lecture } from 'src/lectures/entities/lecture.entity';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  create(createCourseDto: CreateCourseDto) {
    const course = new Course();
    return course;
  }

  findAll() {
    const course = new Course();
    return [course];
  }

  findOne(id: number) {
    const course = new Course();
    return course;
  }

  findQuizzesByCourseId(id: number) {
    const quiz = new Quiz();
    return [quiz];
  }

  findLecturesByCourseId(id: number) {
    const lecture = new Lecture(0, "", "", "");
    return [lecture];
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = new Course();
    return course;
  }

  remove(id: number) {
    const course = new Course();
    return course;
  }
}
