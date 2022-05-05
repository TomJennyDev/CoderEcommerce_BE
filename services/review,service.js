const httpStatus = require("http-status");
const { AppError, catchAsync } = require("../helpers/utils");

const reviewService = {};

reviewService.checkExistreview = catchAsync(async function (reviewId) {
  const review = review.findById(reviewId);
  return !!review;
});

reviewService.createreview = catchAsync(async function (review) {
  const review = review.create(review);

  return user;
});

module.exports = reviewService;
