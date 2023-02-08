const jwt = require("jsonwebtoken");
const { CustomError } = require("../util/customError.util");
const { User } = require("../models");

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.cookies?.jwt) {
            throw new CustomError(400, "로그인이 필요합니다.");
        }
        const token = req.cookies.jwt;
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const userData = await User.findByPk(userId);
        req.userData = userData;
        next();
    } catch (err) {
        next(err);
    }
};

const authAdmin = (req, res, next) => {
    try {
        if (req.userData) {
            if (req.userData.admin) {
                return next();
            }
        }
        throw (new CustomError(400, '어드민이 아닙니다.'));
    } catch (err) {
        next(err);
    }
}

const loginCheck = (req, res, next) => {
    try {
        if (!req.cookies?.jwt) {
            return next();
        }
        throw (new CustomError(400, '이미 로그인이 되어있습니다.'));
    } catch (err) {
        next(err);
    }
}

module.exports = { authMiddleware, authAdmin, loginCheck };
