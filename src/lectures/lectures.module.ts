import { Module } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { LecturesController } from './lectures.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CoursesModule } from 'src/courses/courses.module';

@Module({
  controllers: [LecturesController],
  providers: [LecturesService],
  imports: [PrismaModule, CoursesModule],
  exports: [LecturesService],
})
export class LecturesModule {}
