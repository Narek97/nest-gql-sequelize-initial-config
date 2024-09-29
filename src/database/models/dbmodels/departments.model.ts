import { BaseModel } from '../base.model';
import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { Field, ObjectType } from '@nestjs/graphql';
import { Companies } from '@Models/dbmodels/companies.model';
import { Organizations } from '@Models/dbmodels/organizations.model';
import { Employees } from '@Models/dbmodels/employees.model';

interface CreateDepartmentsAttr {
  name: string;
  companyId: number;
}

@Table({ tableName: 'departments' })
@ObjectType()
export class Departments extends BaseModel<Departments, CreateDepartmentsAttr> {
  @Field(() => String)
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @Field(() => Number)
  @Column({ type: DataType.INTEGER, allowNull: false })
  companyId: number;

  ///////////////////////////////// Relations /////////////////////////////////
  @BelongsTo(() => Companies, { foreignKey: 'companyId' })
  company: Companies;

  @HasMany(() => Organizations, { foreignKey: 'organizationId' })
  organizations: Organizations[];

  @HasMany(() => Employees, { foreignKey: 'employeeId' })
  employees: Employees[];
}
