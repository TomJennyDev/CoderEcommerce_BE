const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const reviewService = require("../services/review.service");

const reviewController = {};

reviewController.getAllReviews = catchAsync(async (req, res, next) => {
  const { query } = req;
  const reviews = await reviewService.getAllReviews(query);
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    reviews,
    "",
    "Get Reviews successfully"
  );
});

reviewController.getReviewByProductId = catchAsync(async (req, res, next) => {
  const { id: productId } = req.params;
  const review = await reviewService.getReviewByProductId(productId);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    review,
    "",
    "Get Review successfully"
  );
});

reviewController.createReview = catchAsync(async (req, res, next) => {
  const { id: userId, role } = req.user;
  const { id: productId } = req.params;

  const review = await reviewService.createReview(
    userId,
    productId,
    req.body,
    role
  );
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    review,
    "",
    "Create review successfully"
  );
});

reviewController.updateReviewById = catchAsync(async (req, res, next) => {
  const { id: userId, role } = req.user;
  const { id: reviewId } = req.params;

  const review = await reviewService.updateReviewById(
    userId,
    reviewId,
    req.body,
    role
  );
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    review,
    "",
    "Update review successfully"
  );
});

reviewController.deleteReviewById = catchAsync(async (req, res, next) => {
  const { id: userId, role } = req.user;
  const { id: reviewId } = req.params;

  await reviewService.deleteReviewById(userId, reviewId, role);
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
