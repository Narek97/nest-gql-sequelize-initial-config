import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ORIGIN, PORT } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    autoFlushLogs: true,
    bodyParser: true,
    cors: true,
  });

  app.enableCors({
    credentials: true,
    origin: ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));

  await app.listen(PORT);
}

bootstrap()
  .then(() => console.log(`App is running in port ${PORT}`))
  .catch(console.error);
