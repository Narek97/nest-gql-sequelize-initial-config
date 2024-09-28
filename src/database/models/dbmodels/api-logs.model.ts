import { BaseModel } from '../base.model';
import { Column, DataType, Table } from 'sequelize-typescript';
import { ObjectType } from '@nestjs/graphql';

interface CreateApiLogsAttr {
  responseTime: number;
  payloadSize: number | null;
  path: string;
  method: string;
  sqlRowQueries: string[];
  queryCount: number;
}

@Table({ tableName: 'api_logs' })
@ObjectType()
export class ApiLogs extends BaseModel<ApiLogs, CreateApiLogsAttr> {
  @Column({ type: DataType.INTEGER })
  responseTime: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  payloadSize: number;

  @Column({ type: DataType.STRING })
  path: string;

  @Column({ type: DataType.STRING })
  method: string;

  @Column({ type: DataType.JSON, allowNull: true })
  sqlRowQueries: string[];

  @Column({ type: DataType.STRING })
  queryCount: string;
}
