'use strict';

const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const organizationsJSON = fs.readFileSync(
      'src/common/constants/seeders/organizations.json',
      {
        encoding: 'utf8',
      },
    );
    const organizations = JSON.parse(organizationsJSON);
    const newOrganizations = [];
    for (const organization of organizations.data) {
      const exists = await queryInterface.rawSelect(
        'organizations',
        {
          where: {
            name: organization.name,
            departmentId: organization.departmentId,
          },
        },
        ['id'],
      );
      if (exists) continue;
      newOrganizations.push(organization);
    }
    if (!newOrganizations.length) return;

    return queryInterface.bulkInsert('organizations', newOrganizations, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('organizations');
  },
};
