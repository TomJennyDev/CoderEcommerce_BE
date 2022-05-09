const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const config = require("../config/config");
const creditCartSchema = require("./CreditCard");

const productSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
    email: { type: String, required: true },
    phone: { type: Number },
    city: { type: String },
    district: { type: String },
    ward: { type: String },
    address1: { type: String },
    address2: { type: String },
    status: { type: String, enum: ["pending", "shipping", "complete"] },
    isDeleted: { type: Boolean, default: false },
    total: { type: Boolean, default: 0, required: true },
    tax: { type: Boolean, default: 0, required: true },
    payment: {
      type: String,
      required: true,
      enum: ["creditCards", "Cash", "BankOnline"],
    },
    creditCards: [creditCartSchema],
    products: [Product],
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(paginate);

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
