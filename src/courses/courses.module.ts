import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [PrismaModule, AwsModule],
})
export class CoursesModule {}
