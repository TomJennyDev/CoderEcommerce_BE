const httpStatus = require("http-status");
const { AppError } = require("../helpers/utils");

const verifyToken = {
  authorization: {
    custom: {
      options: (tokenString) => {
        if (!tokenString) {
          throw new AppError(
            httpStatus.NON_AUTHORITATIVE_INFORMATION,
            "Missing access token",
            "Login Require Error"
          );
        }
        return true;
      },
    },
  },
};

module.exports = {
  verifyToken,
};
