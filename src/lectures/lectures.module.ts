import { Module } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { LecturesController } from './lectures.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [LecturesController],
  providers: [LecturesService],
  imports: [PrismaModule],
})
export class LecturesModule {}
