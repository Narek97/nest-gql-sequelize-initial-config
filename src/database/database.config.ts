import * as dotenv from 'dotenv';
import * as process from 'node:process';
import { SequelizeOptions } from 'sequelize-typescript';

dotenv.config();

export const databaseConfig: SequelizeOptions = {
  dialect: 'mysql',
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  logging: Boolean(process.env.LOGGING),
  define: { timestamps: true },
};
