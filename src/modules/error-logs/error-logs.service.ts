import { Injectable } from '@nestjs/common';
import { CreateErrorLogInput } from '@/modules/error-logs/inputs/create-error-log.input';
import { ErrorLogs } from '@Models/dbmodels/error-logs.model';

@Injectable()
export class ErrorLogsService {
  async createErrorLog(createErrorLogInput: CreateErrorLogInput) {
    await ErrorLogs.create(createErrorLogInput);
  }
}
