const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { AppError } = require("../helpers/utils");

const authMiddleware = {};

authMiddleware.isAdmin = (req, res, next) => {
  const { role } = req.user;

  try {
    if (role !== config.role.admin) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "FORBIDDEN",
        "Authorization error"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
