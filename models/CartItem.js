const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const config = require("../config/config");

const cartItemSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    productId: { type: Schema.Types.ObjectId, ref: "Products" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

cartItemSchema.plugin(paginate);

const cartItem = mongoose.model("cartItems", cartItemSchema);
module.exports = cartItem;
