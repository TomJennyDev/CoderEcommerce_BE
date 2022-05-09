const httpStatus = require("http-status");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shippingSchema = Schema(
  {
    email: { type: String },
    phone: { type: Number },
    city: { type: String },
    district: { type: String },
    Ward: { type: String },
    address1: { type: String },
    address2: { type: String },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

module.exports = shippingSchema;
