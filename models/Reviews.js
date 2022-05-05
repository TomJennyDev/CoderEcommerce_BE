const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const config = require("../config/config");

const reviewSchema = Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: true,
      ref: "User",
    },
    productId: {
      type: Schema.ObjectId,
      required: true,
      ref: "Product",
    },
    comment: { type: String, required: true },
    isPurchased: { type: Boolean },
    postedAt: { type: Date, required: true },
    isHidden: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    totalRatings: { type: Number, default: 0 },
    rateAverage: { type: Number, default: 0 },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

reviewSchema.plugin(paginate);

const Review = mongoose.model("Reviews", reviewSchema);
module.exports = Review;
