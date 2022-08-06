import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || 80;
  console.log('Controller started at port ', port);
  await app.listen(port);
}
bootstrap();
