const express = require("express");
const { validate } = require("../middlewares/validate");
const reviewCtr = require("../controllers/review.controller");
const { logginRequired } = require("../middlewares/passport");
const { reviewVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");

const router = express.Router();

/* GET reviews listing. */
//customers
router.get(
  "/public/:id",
  //   validate(reviewVal.getAllReviewsPublic, ["body"]),
  reviewCtr.getReviewByProductId
);

router.post(
  "/me/create/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(reviewVal.createreview, ["body"]),
  logginRequired,
  reviewCtr.createReview
);

router.put(
  "/me/update/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  //   validate(reviewVal.updateReview, ["body"]),
  reviewCtr.updateReviewById
);
router.delete(
  "/me/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  reviewCtr.deleteReviewById
);

//adminsitrators
router.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  reviewCtr.getAllReviews
);

router.get(
  "/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(reviewVal.getReview, ["body"]),
  logginRequired,
  isAdmin,
  reviewCtr.getReviewByProductId
);

router.post(
  "/create/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(reviewVal.createreview, ["body"]),
  logginRequired,
  isAdmin,
  reviewCtr.createReview
);

router.put(
  "/update/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  //   validate(reviewVal.updateReview, ["body"]),
  reviewCtr.updateReviewById
);

router.delete(
  "/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  reviewCtr.deleteReviewById
);

module.exports = router;
