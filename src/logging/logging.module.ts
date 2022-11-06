import { Global, Module } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';
import { SequelizeModule } from '@nestjs/sequelize';
import { Entry, Request } from './log.entity';
import { LogService } from './log.service';
import { LogController } from './log.controller';

@Module({
  imports: [SequelizeModule.forFeature([Request, Entry])],
  exports: [LoggingInterceptor, LogService],
  providers: [LoggingInterceptor, LogService],
  controllers: [LogController],
})
export class LoggingModule {}
