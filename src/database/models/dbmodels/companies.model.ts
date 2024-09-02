import { BaseModel } from '../base.model';
import { Column, DataType, Table } from 'sequelize-typescript';
import { Field, ObjectType } from '@nestjs/graphql';

interface CreateCompanyAttr {
  name: string;
}

@Table({ tableName: 'companies' })
@ObjectType()
export class Companies extends BaseModel<Companies, CreateCompanyAttr> {
  @Field(() => String)
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}
