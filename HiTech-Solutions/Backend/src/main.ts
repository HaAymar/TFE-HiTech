import * as cors from 'cors';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const corsOptions = {
  //   origin: 'http://localhost:3000',
  //   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   credentials: true,
  // };
  app.use(cors());
  await app.listen(3001);
}
bootstrap();
