const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const config = require("../config/config");

const productSchema = Schema(
  {
    sku: { type: String },
    title: { type: String, require: true },
    metaTitle: { type: String },
    shortDes: { type: String },
    slug: { type: String },
    imageUrls: [{ type: String }],
    status: {
      type: String,
      enum: ["sale", "new", "comming soon"],
    },
    inventoryStatus: { type: String, enum: ["out of stock", "available"] },
    price: { type: Number, require: true },
    priceSale: { type: Number, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    quantity: { type: String, require: true, min: 0 },
    publishedAt: { type: Date },
    rateAverage: 0,
    totalRatings: { type: Number, default: 0 },
    totalPurchases: { type: Number, default: 0 },
    descriptionId: {
      type: Schema.Types.ObjectId,
      ref: "Descriptions",
      default: null,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);
productSchema.plugin(paginate);

productSchema.pre("save", function (next) {
  const product = this;

  //auto update status inventory
  if (product.quantity === 0) {
    product.inventoryStatus = "out of stock";
  } else {
    product.inventoryStatus = "available";
  }

  //auto calculate the price sale
  if (product.discount != 0) {
    product.priceSale = (discount * 100) / product.price;
  }

  //auto generate slug
  if (product.slug) {
    product = product.slug;
  }

  next();
});

productSchema.pre("save", function (next) {
  const product = this;

  //auto update status inventory
  if (product.quantity === 0) {
    product.inventoryStatus = "out of stock";
  } else {
    product.inventoryStatus = "available";
  }

  //auto calculate the price sale
  if (product.discount != 0) {
    priceSale = (discount * 100) / price;
  }
  next();
});

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
