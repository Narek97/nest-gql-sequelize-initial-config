import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { GetCompaniesModel } from '@/modules/companies/models/get-companies.model';
import { GetCompaniesInput } from '@/modules/companies/inputs/get-companies.input';
import { AuthGuard } from '@/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { AccessGuard } from '@/guards/access.guard';

@Resolver()
@UseGuards(AuthGuard)
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(AccessGuard)
  @Query(() => GetCompaniesModel, { nullable: true })
  async getCompanies(
    @Context() { sqlRowQueries }: any,
    @Args('getMyBoardsInput') getCompaniesInput: GetCompaniesInput,
  ): Promise<GetCompaniesModel> {
    return this.companiesService.getCompanies(getCompaniesInput, sqlRowQueries);
  }
}
