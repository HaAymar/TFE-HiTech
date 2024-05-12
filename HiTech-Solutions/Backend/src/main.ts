import * as cors from 'cors';
import * as dotenv from 'dotenv';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/index';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const corsOptions = {
    origin: [process.env.SITE_URL, 'http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

  const uploadDir = join(__dirname, '..', 'public', 'uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
  }

  app.use(cors(corsOptions));
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT, 3000);
}

bootstrap();
