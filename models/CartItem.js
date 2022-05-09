const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const toJSON = require("./plugin/toJSON.plugin");

const cartItemSchema = Schema(
  {
    cartId: { type: Schema.Types.ObjectId, required: true, ref: "Carts" },
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Products" },
    quantity: { type: Number, min: 1 },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);
cartItemSchema.plugin(toJSON);
cartItemSchema.plugin(paginate);

cartItemSchema.index({ cartId: 1, productId: 1 }, { unique: true });
const CartItem = mongoose.model("CartItems", cartItemSchema);
module.exports = CartItem;
