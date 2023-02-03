const jwt = require('jsonwebtoken');
const { CustomError } = require('../util/customError.util');
const { User } = require('../models');

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.cookies?.jwt) {
      throw new CustomError(400, '로그인이 필요합니다.');
    }

    const token = req.cookies.jwt;
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findByPk(userId);
    req.userData = userData;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authMiddleware;