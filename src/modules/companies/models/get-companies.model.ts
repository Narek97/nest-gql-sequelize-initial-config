import { Field, ObjectType } from '@nestjs/graphql';
import { Companies } from '@Models/dbmodels/companies.model';
import { PaginationModel } from '@/common/models/pagination.model';

@ObjectType()
export class GetCompaniesModel extends PaginationModel {
  // @Field(() => [Companies])
  companies: Companies[];
}
