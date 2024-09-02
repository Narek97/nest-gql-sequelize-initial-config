import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import Models from '@Models/index';

export const sequelize = new Sequelize(databaseConfig);
sequelize.addModels(Models);

export const databaseProviders = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    await sequelize.authenticate();
    return sequelize;
  },
};
