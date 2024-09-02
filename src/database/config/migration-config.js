// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const migrationConfig = {
  development: {
    port: process.env.MYSQL_PORT,
    dialect: process.env.DIALECT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    autoLoadModels: true,
    synchronize: false,
  },
};

module.exports = migrationConfig;
