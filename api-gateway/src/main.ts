import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://grfjt3qs-3000.asse.devtunnels.ms',
      'https://a25c48d7e7a0.ngrok-free.app',
      'https://pkd8q6gm-3005.asse.devtunnels.ms/',
      'https://grfjt3qs-3000.asse.devtunnels.ms/'
    ],
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
