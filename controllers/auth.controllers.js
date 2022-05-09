const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const authService = require("../services/auth.service");
const emailService = require("../services/email.service");

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

authController.resetUserPasswordWithEmail = catchAsync(
  async (req, res, next) => {
    await emailService.sendResetPasswordEmail(req.body);
    return sendResponse(
      res,
      httpStatus.OK,
      true,
      {},
      "",
      "Please check your email box!"
    );
  }
);

module.exports = authController;
