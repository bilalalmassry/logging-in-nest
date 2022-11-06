import { Inject, Injectable, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { APP_INTERCEPTOR, ContextIdFactory } from '@nestjs/core';
import { InjectModel, SequelizeModule } from '@nestjs/sequelize';
import { ClsModule, ClsServiceManager } from 'nestjs-cls';
import { Entry } from './logging/log.entity';
import { LogService } from './logging/log.service';
import { LoggingModule } from './logging/logging.module';
import { log } from 'util';
import { raw } from 'express';
import { randomUUID } from 'crypto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('config');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');

@Module({
  imports: [
    ClsModule.register({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) =>
          req.headers['X-Request-Id'] ?? crypto.randomUUID(),
      },
    }),
    CatsModule,
    LoggingModule,
    SequelizeModule.forRoot({
      ...config.get('db'),
      benchmark: true,
      logQueryParameters: true,
      logging: (query, time) => {
        const cls = ClsServiceManager.getClsService();
        const requestId = cls.getId();

        // console.log(query + '\n' + time + 'ms\t' + cls.getId() + '\n');

        if (requestId) {
          Entry.create(
            {
              content: {
                query: query.slice(20),
                time: time,
              },
              requestId,
              id: randomUUID(),
            },
            {
              logging: false,
              returning: false,
              raw: true,
              benchmark: false,
              hooks: false,
            },
          ).catch((e) => console.log(e));
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
