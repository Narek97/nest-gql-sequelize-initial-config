import { BaseModel } from '../base.model';
import { Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { Field, ObjectType } from '@nestjs/graphql';
import { Departments } from '@Models/dbmodels/departments.model';

interface CreateCompanyAttr {
  name: string;
}

@Table({ tableName: 'companies' })
@ObjectType()
export class Companies extends BaseModel<Companies, CreateCompanyAttr> {
  // @Field(() => String)
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  ///////////////////////////////// Relations /////////////////////////////////
  @HasMany(() => Departments, { foreignKey: 'departmentId' })
  departments: Departments[];
}
