const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");

const categoryController = {};

categoryController.getAllCategorys = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Categorys,
    "",
    "User is login successfully"
  );
});

categoryController.getCategoryById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Category,
    "",
    "User is login successfully"
  );
});

categoryController.updateCategoryById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Category,
    "",
    "User is login successfully"
  );
});

categoryController.deleteCategoryById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    {},
    "",
    "User is login successfully"
  );
});

module.exports = categoryController;
