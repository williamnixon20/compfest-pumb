import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuizzesModule } from 'src/quizzes/quizzes.module';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [PrismaModule, QuizzesModule],
  exports: [QuestionsService],
})
export class QuestionsModule {}
