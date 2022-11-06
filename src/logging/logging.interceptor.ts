import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClsServiceManager } from 'nestjs-cls';
import { Request } from './log.entity';
import { log } from 'util';
import { randomUUID } from 'crypto';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [req] = context.getArgs();
    const cls = ClsServiceManager.getClsService();
    const requestId = cls.getId();
    if (req.url.includes('/logs')) return next.handle();

    const now = Date.now();
    const controller = context.getClass().name;
    const controllerFunction = context.getHandler().name;
    const url = req.originalUrl;

    Request.create(
      {
        id: requestId,
        request: req.body,
        function: controllerFunction,
        controller,
        url,
        method: req.method,
      },
      {
        logging: false,
        returning: false,
        raw: true,
        benchmark: false,
        hooks: false,
      },
    );

    return next.handle().pipe(
      tap((data) => {
        const requestTime = Date.now() - now;
        const responseCode = context.switchToHttp().getResponse().statusCode;

        Request.update(
          {
            response: data,
            time: requestTime,
            responseCode,
          },
          {
            where: { id: requestId },
            logging: false,
            benchmark: false,
          },
        );
        return data;
      }),
    );
  }
}
