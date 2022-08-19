import { Module } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  controllers: [OptionsController],
  providers: [OptionsService],
  imports: [PrismaModule, QuestionsModule],
})
export class OptionsModule {}
