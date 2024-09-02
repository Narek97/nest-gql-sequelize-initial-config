import { Module } from '@nestjs/common';
import { CompaniesResolver } from '@/modules/companies/companies.resolver';

@Module({
  providers: [CompaniesResolver],
  exports: [],
})
export class CompaniesModule {}
