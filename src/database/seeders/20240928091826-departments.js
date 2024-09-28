'use strict';

const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const departmentsJSON = fs.readFileSync(
      'src/common/constants/seeders/departments.json',
      {
        encoding: 'utf8',
      },
    );
    const departments = JSON.parse(departmentsJSON);
    const newDepartments = [];
    for (const department of departments.data) {
      const exists = await queryInterface.rawSelect(
        'departments',
        {
          where: {
            name: department.name,
            companyId: department.companyId,
          },
        },
        ['id'],
      );
      if (exists) continue;
      newDepartments.push(department);
    }
    if (!newDepartments.length) return;

    return queryInterface.bulkInsert('departments', newDepartments, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('departments');
  },
};
