import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { GetCompaniesModel } from '@/modules/companies/models/get-companies.model';
import { GetCompaniesInput } from '@/modules/companies/inputs/get-companies.input';
import { AuthGuard } from '@/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { AccessGuard } from '@/guards/access.guard';
import { Public } from '@/decorators/public.decorator';
import { CurrentEmployee } from '@/decorators/current-employee.decorator';
import { Employees } from '@Models/dbmodels/employees.model';

@Resolver()
@UseGuards(AuthGuard)
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(AccessGuard)
  @Query(() => GetCompaniesModel, { nullable: true })
  async getCompanies(
    @Context() { sqlRowQueries, req }: any,
    @CurrentEmployee() employee: Employees,
    @Args('getMyBoardsInput') getCompaniesInput: GetCompaniesInput,
  ): Promise<GetCompaniesModel> {
    console.log(req.user, 'req.user');
    console.log(employee, 'employee');
    return this.companiesService.getCompanies(getCompaniesInput, sqlRowQueries);
  }

  @Public()
  @Query(() => String)
  async getPublic() {
    return 'This is public';
  }
}
