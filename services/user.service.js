const httpStatus = require("http-status");
const { AppError, SearchOptions, catchAsync } = require("../helpers/utils");
const User = require("../models/User");

const userService = {};
/**
 *
 * @param {String} email
 * @param {String} excludeUserId
 * @returns {Boolean}
 *
 */

userService.checkEmailTaken = catchAsync(async function (filter) {
  const user = await User.findOne(filter);

  return !!user;
});

userService.getUserByFilter = catchAsync(async function (filter, options) {
  const user = await User.findOne(filter, options);
  return user;
});

userService.getUserById = catchAsync(async function (userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User is not found",
      "Get single user"
    );
  }
  return user;
});

userService.getAllUsersList = catchAsync(async function (query) {
  const users = await User.paginate(query);
  return users;
});

userService.createUser = catchAsync(async function (userBody) {
  const { email } = userBody;

  const isExits = await userService.checkEmailTaken({ email });
  if (isExits) {
  }
  const user = new User({ ...userBody }).save();
  return user;
});

userService.updateUserById = catchAsync(async function (userId, userBody) {
  let user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User Not Found", "Update current User");
  }

  Object.keys(userBody).forEach((field) => {
    if (userBody[field] !== undefined) {
      user[field] = userBody[field];
    }
  });

  await user.save();
});

userService.deleteUserById = catchAsync(async function (userId) {
  const user = await User.findByIdAndUpdate(userId, { isDeleted: true });
  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "User is not found",
      "Delete single user"
    );
  }
});

module.exports = userService;
