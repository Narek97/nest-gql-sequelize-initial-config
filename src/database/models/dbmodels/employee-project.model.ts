import { BaseModel } from '../base.model';
import { Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { Field, ObjectType } from '@nestjs/graphql';
import { Employees } from '@Models/dbmodels/employees.model';
import { Projects } from '@Models/dbmodels/projects.model';

interface CreateEmployeeProjectsAttr {}

@Table({ tableName: 'employee_projects' })
@ObjectType()
export class EmployeeProjects extends BaseModel<
  EmployeeProjects,
  CreateEmployeeProjectsAttr
> {
  @Field(() => Number)
  @Column({ type: DataType.INTEGER, allowNull: false })
  employeeId: number;

  @Field(() => Number)
  @Column({ type: DataType.INTEGER, allowNull: false })
  projectId: number;

  ///////////////////////////////// Relations /////////////////////////////////
  // @HasMany(() => Employees, { foreignKey: 'employeeId' })
  // employees: Employees[];

  @HasMany(() => Projects, { foreignKey: 'projectId' })
  projects: Projects[];
}
