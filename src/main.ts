import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true});
  await app.listen(3000);
  app.enableCors({
    origin: [
      'http://136.244.118.252:5173',
    ]
  })
}
bootstrap();
