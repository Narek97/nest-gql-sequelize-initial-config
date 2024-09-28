import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as dotenv from 'dotenv';
import { GqlExecutionContext } from '@nestjs/graphql';
import { performance } from 'node:perf_hooks';
import { LogsService } from '@/modules/logs/logs.service';
dotenv.config();

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logsService: LogsService) {}

  intercept(
    initialContext: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    //Before...
    const isRestApiRequest = !!initialContext.switchToHttp().getRequest();

    if (isRestApiRequest) return next.handle();

    const ctx = GqlExecutionContext.create(initialContext);
    const context = ctx.getContext();
    const req = context.req;

    context.sqlRowQueries = [];
    const apiName = ctx.getArgByIndex(3)?.fieldName;
    return next.handle().pipe(
      tap(async (data) => {
        const responseTime = performance.now() - context.apiStartTime;

        const sqlRowQueries: string[] = context.sqlRowQueries ?? [];

        if (context.connection) return;

        await this.logsService.createApiLog({
          responseTime,
          payloadSize: data
            ? +(JSON.stringify(data).length / 1024).toFixed(2)
            : null,
          path: apiName || '',
          method: req.method,
          sqlRowQueries,
          queryCount: sqlRowQueries.length,
        });
      }),
    );
  }
}
