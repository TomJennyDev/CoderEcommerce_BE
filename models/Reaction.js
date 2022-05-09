const httpStatus = require("http-status");
const mongoose = require("mongoose");
const { AppError, catchAsync } = require("../helpers/utils");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");

const reactionSchema = Schema(
  {
    rate: { type: Number, min: 1, max: 5 },
    // emoj: { type: String, enum: ["like", "dislike"] },
    refPaths: {
      type: String,
      enum: ["Reviews", "Products"],
      require: true,
    },
    userId: { type: Schema.Types.ObjectId, refPath: "Users", required: true },
    targetId: {
      type: Schema.Types.ObjectId,
      refPath: "refPaths",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

reactionSchema.plugin(paginate);

reactionSchema.statics.calTotalRating = catchAsync(async function (targetId) {
  targetId = mongoose.Types.ObjectId(targetId);

  const totalRating = await this.aggregate([
    {
      $match: {
        targetId: targetId,
      },
    },
    {
      $group: {
        _id: "$targetId",
        totalRatings: { $sum: 1 },
        rateAverage: { $avg: "$rate" },
      },
    },
    {
      $project: {
        totalRatings: 1,
        rateAverage: { $round: ["$rateAverage", 1] },
      },
    },
  ]);

  return totalRating;
});

const Reaction = mongoose.model("Reactions", reactionSchema);
module.exports = Reaction;
