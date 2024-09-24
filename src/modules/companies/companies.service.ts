import { Injectable } from '@nestjs/common';
import { Companies } from '@Models/dbmodels/companies.model';
import { GetCompaniesInput } from '@/modules/companies/inputs/get-companies.input';
import { GetCompaniesModel } from '@/modules/companies/models/get-companies.model';

@Injectable()
export class CompaniesService {
  async getCompanies(
    getCompaniesInput: GetCompaniesInput,
  ): Promise<GetCompaniesModel> {
    const { offset, limit } = getCompaniesInput;
    const { count, rows } = await Companies.findAndCountAll({ offset, limit });
    return { companies: rows, count, offset, limit };
  }
}
