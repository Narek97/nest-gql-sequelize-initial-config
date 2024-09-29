'use strict';

const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const employeePositionsJSON = fs.readFileSync(
      'src/common/constants/seeders/employee-positions.json',
      {
        encoding: 'utf8',
      },
    );
    const employeePositions = JSON.parse(employeePositionsJSON);
    const newEmployeePositions = [];
    for (const employeePosition of employeePositions.data) {
      const exists = await queryInterface.rawSelect(
        'employee_position',
        {
          where: {
            employeeId: employeePosition.employeeId,
            positionId: employeePosition.positionId,
          },
        },
        ['id'],
      );
      if (exists) continue;
      newEmployeePositions.push(employeePosition);
    }
    if (!newEmployeePositions.length) return;
    return queryInterface.bulkInsert(
      'employee_position',
      newEmployeePositions,
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('employee_position');
  },
};
