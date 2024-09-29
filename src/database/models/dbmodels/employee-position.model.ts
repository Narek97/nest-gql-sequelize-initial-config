import { BaseModel } from '../base.model';
import { Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { Field, ObjectType } from '@nestjs/graphql';
import { Employees } from '@Models/dbmodels/employees.model';
import { Positions } from '@Models/dbmodels/positions.model';

interface CreateEmployeePositionsAttr {}

@Table({ tableName: 'employee_projects' })
@ObjectType()
export class EmployeePositions extends BaseModel<
  EmployeePositions,
  CreateEmployeePositionsAttr
> {
  @Field(() => Number)
  @Column({ type: DataType.INTEGER, allowNull: false })
  employeeId: number;

  @Field(() => Number)
  @Column({ type: DataType.INTEGER, allowNull: false })
  positionId: number;

  ///////////////////////////////// Relations /////////////////////////////////
  @HasMany(() => Employees, { foreignKey: 'employeeId' })
  employees: Employees[];

  @HasMany(() => Positions, { foreignKey: 'positionId' })
  positions: Positions[];
}
