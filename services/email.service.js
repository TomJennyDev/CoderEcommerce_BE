const httpStatus = require("http-status");
const config = require("../config/config");
const transporter = require("../config/loadTransportEmail");
const resetPasswordEmailtemplate = require("../helpers/emailTemplate/resetPassword");
const {
  catchAsync,
  generateRandomHexString,
  AppError,
} = require("../helpers/utils");
const userService = require("./user.service");

const emailService = {};

emailService.sendResetPasswordEmail = async function ({ email }) {
  const filter = { email };

  const options = ["+password"];
  const user = await userService.getUserByFilter(filter, options);

  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email is not found",
      "Reset Password"
    );
  }

  if (user.isResetPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Your request was sent to your Email!",
      "Reset Password"
    );
  }
  const newPassword = generateRandomHexString(8);
  user.password = newPassword;
  user.isResetPassword = true;

  await user.save();

  const html = resetPasswordEmailtemplate(newPassword);

  await transporter.sendMail({
    from: config.email.from,
    to: config.email.to,
    subject: "Reset password from Coder eCommerce",
    html,
  });
};

emailService.sendAcceptOrderEmail = async function (email, token) {
  const isExist = await User.checkEmailTaken(email);
  if (!isExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email is not found",
      "Reset Password"
    );
  }
  await sendEmail({
    subject: "Reset Password Account",
    text: "",
    html,
  });
};

module.exports = emailService;
