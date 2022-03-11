const User = require('../models/user');
const HttpError = require('../utils/httpError');

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json({
      user,
      token: user.getToken(),
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError')
      return next(new HttpError('Provided email already in use', 400, 'email'));

    return next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return next(new HttpError('Please provide an email', 400, 'email'));
  if (!password) return next(new HttpError('Please provide a password', 400, 'password'));

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new HttpError('No user was found with this email', 404, 'email');
    if (!(await user.verifyPassword(password))) throw new HttpError('Verify password', 401, 'password');
    res.status(201).json({
      user,
      token: user.getToken(),
    });
  } catch (error) {
    next(error);
  }
};
