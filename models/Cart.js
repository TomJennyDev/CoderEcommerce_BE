const mongoose = require("mongoose");
const CartItem = require("./CartItem");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const toJSON = require("./plugin/toJSON.plugin");
const shippingSchema = require("./shipping");

const cartSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "Users",
    },
    shipping: shippingSchema,
    status: {
      type: String,
      enum: ["detail", "shipping", "payment", "review"],
      default: "detail",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);
cartSchema.plugin(toJSON);

cartSchema.plugin(paginate);

const Cart = mongoose.model("Carts", cartSchema);
module.exports = Cart;
