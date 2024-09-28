'use strict';

const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const companiesJSON = fs.readFileSync(
      'src/common/constants/seeders/companies.json',
      {
        encoding: 'utf8',
      },
    );
    const companies = JSON.parse(companiesJSON);
    const newCompanies = [];
    for (const company of companies.data) {
      const exists = await queryInterface.rawSelect(
        'companies',
        {
          where: {
            name: company.name,
          },
        },
        ['id'],
      );
      if (exists) continue;
      newCompanies.push(company);
    }
    if (!newCompanies.length) return;

    return queryInterface.bulkInsert('companies', newCompanies, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('companies');
  },
};
