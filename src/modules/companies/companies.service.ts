import { Injectable } from '@nestjs/common';
import { Companies } from '@Models/dbmodels/companies.model';
import { GetCompaniesInput } from '@/modules/companies/inputs/get-companies.input';
import { GetCompaniesModel } from '@/modules/companies/models/get-companies.model';
import { Departments } from '@Models/dbmodels/departments.model';

@Injectable()
export class CompaniesService {
  async getCompanies(
    getCompaniesInput: GetCompaniesInput,
    sqlRowQueries: string[],
  ): Promise<GetCompaniesModel> {
    const { offset, limit } = getCompaniesInput;
    const { count, rows } = await Companies.findAndCountAll({
      offset,
      limit,
      logging: (sql: string) => sqlRowQueries.push(sql),
      include: [
        {
          model: Departments,
        },
      ],
    });
    return { companies: rows, count, offset, limit };
  }
}
