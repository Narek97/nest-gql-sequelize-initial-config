import { Args, Query, Resolver } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { GetCompaniesModel } from '@/modules/companies/models/get-companies.model';
import { GetCompaniesInput } from '@/modules/companies/inputs/get-companies.input';

@Resolver()
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Query(() => GetCompaniesModel, { nullable: true })
  async getCompanies(
    @Args('getMyBoardsInput') getCompaniesInput: GetCompaniesInput,
  ): Promise<GetCompaniesModel> {
    return this.companiesService.getCompanies(getCompaniesInput);
  }
}
