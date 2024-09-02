import { Resolver } from '@nestjs/graphql';
import { CompaniesService } from '@/modules/companies/companies.service';

@Resolver()
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}
}
