'use strict';

const fs = require('fs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const positionsJSON = fs.readFileSync(
      'src/common/constants/seeders/positions.json',
      {
        encoding: 'utf8',
      },
    );
    const positions = JSON.parse(positionsJSON);
    const newPositions = [];
    for (const position of positions.data) {
      const exists = await queryInterface.rawSelect(
        'positions',
        {
          where: {
            position: position.position,
          },
        },
        ['id'],
      );
      if (exists) continue;
      newPositions.push(position);
    }
    if (!newPositions.length) return;
    return queryInterface.bulkInsert('positions', newPositions, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('positions');
  },
};
