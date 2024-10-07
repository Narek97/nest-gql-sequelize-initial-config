import { BaseModel } from '../base.model';
import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { Field, ObjectType } from '@nestjs/graphql';
import { Departments } from '@Models/dbmodels/departments.model';
import { Employees } from '@Models/dbmodels/employees.model';

interface CreateOrganizationAttr {
  name: string;
  companyId: number;
}

@Table({ tableName: 'organizations' })
@ObjectType()
export class Organizations extends BaseModel<
  Organizations,
  CreateOrganizationAttr
> {
  @Field(() => String)
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @Field(() => Number)
  @Column({ type: DataType.INTEGER, allowNull: false })
  departmentId: number;

  ///////////////////////////////// Relations /////////////////////////////////
  @BelongsTo(() => Departments, { foreignKey: 'departmentId' })
  departments: Departments;

  @HasMany(() => Employees, { foreignKey: 'organizationId' })
  employees: Employees[];
}
