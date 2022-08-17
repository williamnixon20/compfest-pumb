import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  controllers: [ResourcesController],
  providers: [ResourcesService],
  imports: [PrismaModule, AwsModule],
})
export class ResourcesModule {}
