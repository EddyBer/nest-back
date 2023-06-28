import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true});
  await app.listen(3000);
  app.enableCors({
    origin: [
      'http://localhost',
      'http://localhost:5173',
      'http://localhost:3000'
    ]
  })
}
bootstrap();
