import { Column, DataType, Model } from 'sequelize-typescript';
import { Field } from '@nestjs/graphql';

export class BaseModel<T, G> extends Model<T, G> {
  @Field(() => Number)
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Field(() => String)
  @Column({ type: DataType.DATE })
  createdAt: string;

  @Field(() => String)
  @Column({ type: DataType.DATE })
  updatedAt: string;
}
