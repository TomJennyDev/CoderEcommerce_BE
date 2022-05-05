const httpStatus = require("http-status");
const {
  AppError,
  generateRandomHexString,
  catchAsync,
} = require("../helpers/utils");
const userService = require("./user.service");

const authService = {};

authService.loginUserWithEmailPassword = catchAsync(async function (
  email,
  password
) {
  const filter = { email };
  const options = ["+password", "+role"];
  const user = await userService.getUserByFilter(filter, options);

  if (user && !(await user.isPasswordMatch(password))) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Incorrect email or password",
      "Authentication error"
    );
  } else if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Email is not exist, please register",
      "Authentication error"
    );
  }

  const token = await user.generateToken();
  user._doc.accessToken = token;

  return user;
});

authService.loginUserWithSocial = catchAsync(async function (socialUser) {
  const { id, displayName, emails, photos, provider } = socialUser;

  filter = { email: emails[0].value };

  socialCriteria = { facebook: "facebookId", google: "googleId" };
  socialId = socialCriteria[provider];

  let user = await userService.getUserByFilter(filter);

  if (!user) {
    const newUser = {
      name: displayName,
      [socialId]: id,
      email: emails[0].value,
      isEmailVerified: true,
      password: generateRandomHexString(8),
      avatar: photos[0].value,
    };

    user = await userService.createUser(newUser);
  }

  const token = await user.generateToken();
  user._doc.accessToken = token;

  return user;
});

module.exports = authService;
