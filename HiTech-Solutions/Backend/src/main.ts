import * as cors from 'cors';
import * as dotenv from 'dotenv';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/index';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const corsOptions = {
  //   origin: 'http://localhost:3000',
  //   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   credentials: true,
  // };

  app.use(cors());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3001);
}
bootstrap();
