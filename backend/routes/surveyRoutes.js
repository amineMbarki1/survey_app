const express = require('express');
const router = express.Router();

const { validateSurveyData } = require('../middlewares/validationMiddlewares');
const { createSurvey, getSurveys, getSurvey } = require('../controllers/surveyController');
const authMiddleware = require('../middlewares/authMiddleware');

router.route('/').post(authMiddleware, validateSurveyData, createSurvey).get(authMiddleware, getSurveys);
router.route('/:id').get(authMiddleware, getSurvey);

module.exports = router;
