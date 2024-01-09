const fs = require('fs');
require('dotenv').config();

module.exports = {
  "development": {
    "username": `${process.env.POSTGRES_USER}`,
    "password": `${process.env.POSTGRES_PASSWORD}`,
    "database": `${process.env.POSTGRES_DB_DEV}`,
    "dialect": "postgres",
    "port": `${process.env.POSTGRES_PORT}`,
  },
  "test": {
    "username": `${process.env.POSTGRES_USER}`,
    "password": `${process.env.POSTGRES_PASSWORD}`,
    "database": `${process.env.POSTGRES_DB_TEST}`,
    "host": `${process.env.POSTGRES_HOST}`,
    "dialect": "postgres",
    "port": `${process.env.POSTGRES_PORT}`,
  },
  "production": {
    "username": `${process.env.POSTGRES_USER}`,
    "password": `${process.env.POSTGRES_PASSWORD}`,
    "database": `${process.env.POSTGRES_DB_PROD}`,
    "host": `${process.env.POSTGRES_HOST}`,
    "dialect": "postgres",
    "port": `${process.env.POSTGRES_PORT}`,
  }
}
