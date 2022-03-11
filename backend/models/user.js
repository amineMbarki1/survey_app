'use strict';

const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../config/db');
const { Survey } = require('./survey');

const User = db.define('user', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 10));
    },
  },
});

User.prototype.getToken = function () {
  return jwt.sign({ user: this.id }, process.env.SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
};

User.prototype.verifyPassword = async function (providedPassword) {
  return await bcrypt.compare(providedPassword, this.password);
};

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

User.hasMany(Survey, { onDelete: 'cascade' });
Survey.belongsTo(User);

// User.sync();
// Survey.sync();
module.exports = User;
