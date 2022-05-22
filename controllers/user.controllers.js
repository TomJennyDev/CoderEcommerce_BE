const httpStatus = require("http-status");
const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const userService = require("../services/user.service");

const userController = {};

userController.getCurrentUser = catchAsync(async (req, res) => {
  const { id } = req.user;
  let user = await userService.getUserById(id);

  const token = user.generateToken();

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    user,
    null,
    "Get current user successfully"
  );
});

userController.createUserByEmailPassword = catchAsync(
  async (req, res, next) => {
    let user = await userService.createUser(req.body);

    const token = user.generateToken();

    user = user.filterOutputUser();

    return sendResponse(
      res,
      httpStatus.OK,
      true,
      { user, accessToken: token },
      null,
      "User is register successfully"
    );
  }
);

userController.updateCurrentUser = catchAsync(async (req, res) => {
  const { id } = req.user;

  await userService.updateUserById(id, req.body);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    {},
    null,
    "Update current user successfully"
  );
});

userController.deleteCurrentUser = catchAsync(async (req, res) => {
  const { id } = req.user;
  await userService.deleteUserById(id);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    {},
    null,
    "Delete current user successfully"
  );
});

userController.getSingleUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    user,
    null,
    "Get user successfully"
  );
});

userController.getAllUsersList = catchAsync(async (req, res) => {
  const { query } = req;
  let users = await userService.getAllUsersList(query);
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    users,
    null,
    "Get User List successfully"
  );
});

userController.updateUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  await userService.updateUserById(id, req.body);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    {},
    null,
    "Update user successfully"
  );
});

userController.deleteUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  await userService.deleteUserById(id);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    {},
    null,
    "Delete user successfully"
  );
});

module.exports = userController;
