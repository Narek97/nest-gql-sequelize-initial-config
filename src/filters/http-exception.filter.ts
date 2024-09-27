import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ErrorLogsService } from '@/modules/error-logs/error-logs.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly errorLogsService: ErrorLogsService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = response.statusCode ?? exception?.getStatus();
    const message =
      exception?.response?.message ||
      exception?.message ||
      'Internal server error';

    try {
      await this.errorLogsService.createErrorLog({
        status,
        message: Array.isArray(message) ? message.join() : message,
        path:
          host.getArgByIndex(3)?.fieldName ??
          host.switchToHttp().getRequest().originalUrl ??
          '',
      });
      if (status == 409 || status == 422 || status == 401 || status === 403) {
        return response.status(status).json(exception.response);
      }
      if (status == 500) {
        return response.status(status).json(exception);
      }
      if (
        status == 400 &&
        exception?.response?.message &&
        Array.isArray(exception?.response?.message)
      ) {
        return response
          .status(422)
          .json(
            exception.response.message[0] ||
              'Something went wrong (Server Error, HttpExceptionFilter)',
          );
      }
      throw { response: message };
      // return response.status(status).json(exception.response);
    } catch (err) {
      console.log(err, 'err');
      if (response) {
        response
          .status(500)
          .json(
            err?.response ||
              'Something went wrong (Server Error, HttpExceptionFilter last catch)',
          );
      } else {
        return [
          err?.response ||
            'Something went wrong (Server Error, HttpExceptionFilter last catch)',
        ];
      }
    }
  }
}
