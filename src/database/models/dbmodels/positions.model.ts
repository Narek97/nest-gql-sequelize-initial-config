import { BaseModel } from '../base.model';
import { Column, DataType, HasMany, Table } from 'sequelize-typescript';
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
  @HasMany(() => Employees, { foreignKey: 'positionId' })
  employees: Employees[];
}
