import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LecturesModule } from './lectures/lectures.module';
import { QuestionsModule } from './questions/questions.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth';
import { CoursesModule } from './courses/courses.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { AdminModule } from './admin/admin.module';
import { ResourcesModule } from './resources/resources.module';
import { AwsModule } from './aws/aws.module';
import { OptionsModule } from './options/options.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    LecturesModule,
    QuestionsModule,
    CoursesModule,
    QuizzesModule,
    AdminModule,
    ResourcesModule,
    AwsModule,
    OptionsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
