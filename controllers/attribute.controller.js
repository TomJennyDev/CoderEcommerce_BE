const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");

const attributeController = {};

attributeController.getAllAttributes = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Attributes,
    "",
    "User is login successfully"
  );
});

attributeController.getAttributeById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Attribute,
    "",
    "User is login successfully"
  );
});

attributeController.updateAttributeById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Attribute,
    "",
    "User is login successfully"
  );
});

attributeController.deleteAttributeById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    {},
    "",
    "User is login successfully"
  );
});

module.exports = attributeController;
