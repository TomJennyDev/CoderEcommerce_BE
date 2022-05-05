const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const authService = require("../services/auth.service");

const authController = {};

authController.loginUserWithEmailPassword = catchAsync(
  async (req, res, next) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailPassword(email, password);

    return sendResponse(
      res,
      httpStatus.OK,
      true,
      user,
      "",
      "User is login successfully"
    );
  }
);

authController.loginUserWithGoogle = catchAsync(async (req, res, next) => {
  const user = await authService.loginUserWithSocial(req.user);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    user,
    "",
    "User is login successfully"
  );
});

authController.loginUserWithFacebook = catchAsync(async (req, res, next) => {
  const user = await authService.loginUserWithSocial(req.user);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    user,
    "",
    "User is login successfully"
  );
});

module.exports = authController;
