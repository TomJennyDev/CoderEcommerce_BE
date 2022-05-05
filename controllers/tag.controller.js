const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");

const TagController = {};

TagController.getAllTags = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Tags,
    "",
    "User is login successfully"
  );
});

TagController.getTagById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Tag,
    "",
    "User is login successfully"
  );
});

TagController.updateTagById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Tag,
    "",
    "User is login successfully"
  );
});

TagController.deleteTagById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    {},
    "",
    "User is login successfully"
  );
});

module.exports = TagController;
