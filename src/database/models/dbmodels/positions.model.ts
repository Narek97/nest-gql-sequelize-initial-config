import { BaseModel } from '../base.model';
import { BelongsToMany, Column, DataType, Table } from 'sequelize-typescript';
import { Field, ObjectType } from '@nestjs/graphql';
import { Employees } from '@Models/dbmodels/employees.model';

interface CreatePositionsAttr {
  name: string;
}

@Table({ tableName: 'positions' })
@ObjectType()
export class Positions extends BaseModel<Positions, CreatePositionsAttr> {
  @Field(() => String)
  @Column({ type: DataType.STRING, unique: true })
  position: string;

  ///////////////////////////////// Relations /////////////////////////////////
  @BelongsToMany(
    () => Employees,
    'employee_position',
    'positionId',
    'employeeId',
  )
  employees: Employees[];
}
