const httpStatus = require("http-status");
const { Types } = require("mongoose");
const { AppError, catchAsync } = require("../helpers/utils");
const Review = require("../models/Reviews");
const productService = require("./product.service");

const reviewService = {};

reviewService.checkExistReview = async function (userId, productId) {
  const review = await Review.findOne({ userId, productId, isDeleted: false });
  return !!review;
};

reviewService.getAllReviews = async function (query) {
  const reviews = await Review.paginate(query);

  return reviews;
};

reviewService.getReviewByProductId = async function (productId) {
  let query = { productId, isDelete: false, populate: "userId" };

  const review = await Review.paginate(query);

  if (!review) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Review is not found",
      "Get single review"
    );
  }
  return review;
};

reviewService.createReview = async function (
  userId,
  productId,
  reviewBody,
  role
) {
  productId = Types.ObjectId(productId);
  if (await !productService.checkExistProduct(productId)) {
    throw new AppError(404, "Product Id is not Exist", "Create review");
  }
  let filter = { userId, productId, isDeleted: false };

  let review = await Review.findOne(filter);

  if (review) {
    throw new AppError(404, "Review is Exist", "Create review");
  }

  let newReview = {};
  Object.keys(reviewBody).forEach((field) => {
    if (reviewBody[field] !== undefined) {
      newReview[field] = reviewBody[field];
    }
  });
  review = await Review.create({ userId, productId, ...newReview });

  return review;
};

reviewService.updateReviewById = async function (
  userId,
  reviewId,
  reviewBody,
  role
) {
  let filter = { _id: reviewId, isDeleted: false };

  let review = await Review.findOne(filter);

  if (!review) {
    throw new AppError(404, "Review Not Found", "Update review");
  }

  if (!review.userId.equals(userId) && role !== "admin") {
    throw new AppError(
      401,
      "Unauthorized edit other's review",
      "Update Post error"
    );
  }

  Object.keys(reviewBody).forEach((field) => {
    if (reviewBody[field] !== undefined) {
      review[field] = reviewBody[field];
    }
  });

  await review.save();

  return review;
};

reviewService.deleteReviewById = async function (userId, reviewId, role) {
  let filter = { _id: reviewId, isDeleted: false };

  let review = await Review.findOne(filter);

  if (!review) {
    throw new AppError(404, "Review Not Found", "Delete single review");
  }

  if (!review.userId.equals(userId) && role !== "admin") {
    throw new AppError(
      401,
      "Unauthorized edit other's review",
      "Update Post error"
    );
  }

  review.isDeleted = true;
  await review.save();

  return review;
};
module.exports = reviewService;
