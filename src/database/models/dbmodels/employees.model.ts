import { BaseModel } from '../base.model';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Table,
} from 'sequelize-typescript';
import { Field, ObjectType } from '@nestjs/graphql';
import { Departments } from '@Models/dbmodels/departments.model';
import { Organizations } from '@Models/dbmodels/organizations.model';
import { Projects } from '@Models/dbmodels/projects.model';
import { Positions } from '@Models/dbmodels/positions.model';

interface CreateEmployeesAttr {
  name: string;
  email: string;
  departmentId: number;
  organizationId: number;
}

@Table({ tableName: 'employees' })
@ObjectType()
export class Employees extends BaseModel<Employees, CreateEmployeesAttr> {
  @Field(() => String)
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @Field(() => String)
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Field(() => Number)
  @Column({ type: DataType.INTEGER, allowNull: false })
  departmentId: number;

  @Field(() => Number)
  @Column({ type: DataType.INTEGER, allowNull: false })
  organizationId: number;

  @Field(() => Number)
  @Column({ type: DataType.INTEGER, allowNull: false })
  positionId: number;

  ///////////////////////////////// Relations /////////////////////////////////

  @BelongsTo(() => Departments, { foreignKey: 'departmentId' })
  department: Departments;

  @BelongsTo(() => Organizations, { foreignKey: 'organizationId' })
  organization: Organizations;

  @BelongsTo(() => Positions, { foreignKey: 'positionId' })
  position: Positions;

  @BelongsToMany(() => Projects, 'employee_projects', 'employeeId', 'projectId')
  projects: Projects[];
}
