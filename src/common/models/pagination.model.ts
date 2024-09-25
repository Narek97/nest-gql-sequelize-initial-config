import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationModel {
  // @Field(() => Number, { nullable: true, defaultValue: 0 })
  limit: number;

  // @Field(() => Number, { nullable: true, defaultValue: 10 })
  offset: number;

  // @Field(() => Number, { nullable: true })
  count?: number;
}
