const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");

const reviewController = {};

reviewController.getAllReviews = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Reviews,
    "",
    "Get Reviews successfully"
  );
});

reviewController.getReviewById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Review,
    "",
    "Get Review successfully"
  );
});

reviewController.updateReviewById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Review,
    "",
    "Update review successfully"
  );
});

reviewController.deleteReviewById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    {},
    "",
    "Delete Review successfully"
  );
});

module.exports = reviewController;
