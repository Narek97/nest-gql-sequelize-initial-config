import { BaseModel } from '../base.model';
import { BelongsToMany, Column, DataType, Table } from 'sequelize-typescript';
import { Field, ObjectType } from '@nestjs/graphql';
import { Employees } from '@Models/dbmodels/employees.model';

interface CreateProjectAttr {
  name: string;
}

@Table({ tableName: 'projects' })
@ObjectType()
export class Projects extends BaseModel<Projects, CreateProjectAttr> {
  @Field(() => String)
  @Column({ type: DataType.STRING, unique: true })
  name: string;

  @Field(() => String)
  @Column({ type: DataType.STRING, unique: true })
  description: string;

  ///////////////////////////////// Relations /////////////////////////////////
  @BelongsToMany(
    () => Employees,
    'employee_projects',
    'projectId',
    'employeeId',
  )
  employees: Employees[];
}
