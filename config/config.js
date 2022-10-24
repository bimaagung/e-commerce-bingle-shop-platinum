require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME || 'localhost',
    port: process.env.DB_PORT || 5432, 
    dialect: process.env.DB_DIALECT,
  },
};
