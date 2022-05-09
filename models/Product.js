const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const autoPopulate = require("mongoose-autopopulate");
const toJSON = require("./plugin/toJSON.plugin");
const Category = require("./Category");
const Attributes = require("./Attributes");
const slug = require("mongoose-slug-updater");

const productSchema = Schema(
  {
    sku: { type: String },
    title: { type: String, require: true },
    metaTitle: { type: String },
    content: { type: String },
    slug: { type: String, slug: ["title", "_id"] },
    imageUrls: [{ type: String }],
    status: {
      type: String,
      enum: ["sale", "new", "comming soon"],
    },
    inventoryStatus: { type: String, enum: ["out of stock", "available"] },
    price: { type: Number, require: true, default: 0, min: 0 },
    priceSale: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    quantity: { type: Number, require: true, min: 0 },
    rateAverage: 0,
    totalRatings: { type: Number, default: 0 },
    totalPurchases: { type: Number, default: 0 },
    descriptions: {
      type: Schema.Types.ObjectId,
      ref: "Descriptions",
      default: null,
    },
    categories: [{ type: Schema.Types.ObjectId, ref: "Categories" }],
    attributes: [{ type: Schema.Types.ObjectId, ref: "Attributes" }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
productSchema.plugin(autoPopulate);
productSchema.plugin(slug);

productSchema.pre("save", function (next) {
  let product = this;

  //auto update status inventory
  if (product.quantity === 0) {
    product.inventoryStatus = "out of stock";
  } else {
    product.inventoryStatus = "available";
  }

  //auto calculate the price sale
  if (product.isModified("discount") || product.isModified("price")) {
    product.priceSale = parseFloat(
      (product.price - (product.discount * product.price) / 100).toFixed(1)
    );
  }

  next();
});

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
