const httpStatus = require("http-status");
const { Types } = require("mongoose");
const { AppError, catchAsync } = require("../helpers/utils");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const cartItemService = require("./CartItem.service");

const cartService = {};

cartService.checkExistCart = async function (userId) {
  const cart = Cart.findOne({ userId });
  return !!cart;
};

cartService.getAllCarts = async function (query) {
  const carts = await Cart.paginate(query);

  return carts;
};

cartService.getCartById = async function (userId, cartId, role) {
  let filter = { userId };

  if (role === "admin") {
    filter = { cartId };
  }

  let cart = await Cart.findOne(filter);

  if (!cart) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Cart is not found",
      "Get single cart"
    );
  }

  const cartItem = await cartItemService.getAllCartItemByCartId(cart._id);

  let carts = { cart, products: cartItem };

  return carts;
};

cartService.createCart = async function (userId) {
  let cart = await Cart.find({ userId });
  if (cart) {
    throw new AppError(404, "Cart is Exists", "Create cart");
  }

  cart = await Cart.create({ userId });

  return cart;
};

cartService.updateCartById = async function (userId, cartBody, cartId, role) {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new AppError(404, "Cart Not Found", "Update cart");
  }

  Object.keys(cartBody).forEach((field) => {
    if (cartBody[field] !== undefined) {
      cart[field] = cartBody[field];
    }
  });
  await cart.save();
  return cart;
};

cartService.deleteCartById = async function (cartId) {
  const cart = await Cart.findByIdAndUpdate(cartId, {
    isDeleted: true,
  });
  if (!cart) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Cart is not found",
      "Delete single cart"
    );
  }
  return cart;
};

module.exports = cartService;
