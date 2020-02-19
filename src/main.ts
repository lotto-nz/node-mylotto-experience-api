import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: {origin: "*", methods: "GET,PUT,POST,DELETE,PATCH"}});
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  await app.listen(process.env.HTTP_PORT || 8080);
}
bootstrap();
