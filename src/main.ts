import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging/logging.interceptor';

process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
