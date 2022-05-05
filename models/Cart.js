const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const config = require("../config/config");

const cartSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    isDeleted: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true },
    phone: { type: Number },
    city: { type: String },
    district: { type: String },
    Ward: { type: String },
    address1: { type: String },
    address2: { type: String },
    status: {type: String, enum["detail","shipping","payment",""]}
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

cartSchema.plugin(paginate);

const cart = mongoose.model("Categories", cartSchema);
module.exports = cart;
