import { BaseModel } from '../base.model';
import { Column, DataType, Table } from 'sequelize-typescript';
import { ObjectType } from '@nestjs/graphql';

interface CreateErrorLogsAttr {
  status: number;
  message: string;
  path: string;
}

@Table({ tableName: 'error_logs' })
@ObjectType()
export class ErrorLogs extends BaseModel<ErrorLogs, CreateErrorLogsAttr> {
  @Column({ type: DataType.INTEGER })
  status: number;

  @Column({ type: DataType.STRING })
  message: string;

  @Column({ type: DataType.STRING })
  path: string;
}
