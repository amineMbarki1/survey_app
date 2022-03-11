'use strict';

const { Sequelize } = require('sequelize');

const { DATABASE, HOST, DB_PORT, USER, PASSWORD } = process.env;

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
