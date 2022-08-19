import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  controllers: [QuizzesController],
  providers: [QuizzesService],
  imports: [PrismaModule, CoursesModule],
  exports: [QuizzesService],
})
export class QuizzesModule {}
