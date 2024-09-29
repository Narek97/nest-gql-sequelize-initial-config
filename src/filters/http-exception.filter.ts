import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { LogsService } from '@/modules/logs/logs.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logsService: LogsService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = response.statusCode ?? exception?.getStatus();
    const message =
      exception?.response?.message ||
      exception?.message ||
      'Internal server error';

    await this.logsService.createErrorLog({
      status,
      message: Array.isArray(message) ? message.join() : message,
      path:
        host.getArgByIndex(3)?.fieldName ??
        host.switchToHttp().getRequest().originalUrl ??
        '',
    });
    return exception;
  }
}
