import { Column, DataType, Model } from 'sequelize-typescript';
import 'reflect-metadata';

//if we don't want to use @Field, imports reflect-metadata and in nestjs.js add
// "compilerOptions": {
// "plugins": ["@nestjs/graphql"],
// "deleteOutDir": true
// }
export class BaseModel<T, G> extends Model<T, G> {
  // @Field(() => Number)
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  // @Field(() => String)
  @Column({ type: DataType.DATE })
  createdAt: string;

  // @Field(() => String)
  @Column({ type: DataType.DATE })
  updatedAt: string;
}
