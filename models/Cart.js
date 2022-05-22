const mongoose = require("mongoose");
const CartItem = require("./CartItem");
const creditCartSchema = require("./CreditCard");
const paymentSchema = require("./Payment");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const toJSON = require("./plugin/toJSON.plugin");
const shippingSchema = require("./Shipping");

const cartSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "Users",
    },
    shipping: shippingSchema,
    payment: paymentSchema,
    status: {
      type: String,
      enum: ["Cart", "Delivery", "Payment", "Summary"],
      default: "Cart",
    },
    totalItem: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

cartSchema.plugin(paginate);

const Cart = mongoose.model("Carts", cartSchema);
module.exports = Cart;
