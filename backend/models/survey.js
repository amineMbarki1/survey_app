'use strict';

const { DataTypes } = require('sequelize');

const db = require('../config/db');

const Question = db.define('question', {
  type: { type: DataTypes.STRING },
  question: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
});

const Option = db.define('option', {
  option: { type: DataTypes.STRING },
});

const Survey = db.define('survey', {
  title: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  expireDate: { type: DataTypes.STRING },
});

Survey.hasMany(Question, { onDelete: 'cascade' });
Question.belongsTo(Survey);
Question.hasMany(Option, { onDelete: 'cascade' });
Option.belongsTo(Question);
// eany(Option, { as: 'Options' });
// Option.belongsTo(Question, { as: 'Question' });

module.exports = { Survey, Question, Option };
