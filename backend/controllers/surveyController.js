const { Survey, Question, Option } = require('../models/survey');
const HttpError = require('../utils/httpError');

exports.getSurveys = (req, res, next) => {};

exports.createSurvey = async (req, res, next) => {
  try {
    const survey = await Survey.create(req.body, { include: { all: true, nested: true } });
    req.user.addSurvey(survey);
    res.status(201).json({ survey });
  } catch (error) {
    next(error);
  }
};

exports.getSurveys = async (req, res, next) => {
  try {
    const surveys = await req.user.getSurveys({ include: [{ model: Question, include: { model: Option } }] });
    if (!surveys) throw new HttpError('No surveys were found', 404);
    res.json({ surveys });
  } catch (error) {
    next(error);
  }
};

exports.getSurvey = async (req, res, next) => {
  const { id } = req.params;
  try {
    const survey = await req.user.getSurveys({
      include: [{ model: Question, include: { model: Option } }],
      where: { id },
    });
    if (!survey) throw new HttpError('No survey was found', 404);
    res.status(200).json({ survey: survey[0] });
  } catch (error) {
    next(error);
  }
};

exports.deleteSurvey = async (req, res, next) => {
  const { id } = req.params;
  try {
    const survey = await req.user.getSurveys({ include: { all: true, nested: true }, where: { id } });
    if (!survey) throw new HttpError('No survey was found', 404);
    await survey.destroy();
  } catch (error) {
    next(error);
  }
};
