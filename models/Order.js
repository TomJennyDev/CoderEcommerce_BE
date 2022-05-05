const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const config = require("../config/config");

const productSchema = Schema(
  {
    sku: { type: String },
    cover: { type: String },
    title: { type: String },
    metaTitle: { type: String },
    slug: { type: String },
    imageUrls: { type: Array, default: [] },
    status: { type: String, enum: ["sale", "new"], default: "sale" },
    price: { type: Number, require: true },
    priceSale: { type: Number },
    discount: { type: Number },
    quantity: { type: String, require: true },
    publishedAt: { type: Date },
    ratings: { type: Number, min: 0, max: 5, default: 0 },
    totalReview: { type: Number },
    descriptionId: {
      type: Schema.Types.ObjectId,
      ref: "Descriptions",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

productSchema.plugin(paginate);

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
