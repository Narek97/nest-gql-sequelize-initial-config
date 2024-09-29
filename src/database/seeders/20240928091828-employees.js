'use strict';

const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const employeesJSON = fs.readFileSync(
      'src/common/constants/seeders/employees.json',
      {
        encoding: 'utf8',
      },
    );
    const employees = JSON.parse(employeesJSON);
    const newEmployees = [];
    for (const employee of employees.data) {
      const exists = await queryInterface.rawSelect(
        'employees',
        {
          where: {
            name: employee.name,
            email: employee.email,
            departmentId: employee.departmentId,
            organizationId: employee.organizationId,
          },
        },
        ['id'],
      );
      if (exists) continue;
      newEmployees.push(employee);
    }
    if (!newEmployees.length) return;
    console.log(newEmployees, 'newEmployees');
    return queryInterface.bulkInsert('employees', newEmployees, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('employees');
  },
};
