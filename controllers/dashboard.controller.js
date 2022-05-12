const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");

const descriptionController = {};

descriptionController.getDescriptionById = catchAsync(
  async (req, res, next) => {
    return sendResponse(
      res,
      httpStatus.OK,
      true,
      Description,
      "",
      "User is login successfully"
    );
  }
);

descriptionController.updateDescriptionById = catchAsync(
  async (req, res, next) => {
    return sendResponse(
      res,
      httpStatus.OK,
      true,
      Description,
      "",
      "User is login successfully"
    );
  }
);

descriptionController.deleteDescriptionById = catchAsync(
  async (req, res, next) => {
    return sendResponse(
      res,
      httpStatus.OK,
      true,
      {},
      "",
      "User is login successfully"
    );
  }
);

module.exports = descriptionController;
