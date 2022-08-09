import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || 3000;
  console.log('Controller started at port', port);
  const config = new DocumentBuilder()
    .setTitle('PUMB API Description')
    .setDescription('')
    .setVersion('1.0')
    .build();
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);
  await app.listen(port);
}
bootstrap();
