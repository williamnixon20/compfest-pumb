import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AnswersModule } from './answers/answers.module';
import { LecturesModule } from './lectures/lectures.module';

@Module({
  imports: [PrismaModule, AnswersModule, LecturesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
