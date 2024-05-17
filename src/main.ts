import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {

const corsOptions:CorsOptions = {
  origin: '*',
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}

  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
