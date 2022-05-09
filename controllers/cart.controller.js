const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const Cart = require("../models/Cart");
const cartService = require("../services/cart.service");

const cartController = {};

cartController.getAllCarts = catchAsync(async (req, res, next) => {
  const carts = await cartService.getAllCarts(req.query);
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    carts,
    "",
    "Get Carts successfully"
  );
});

cartController.getCartById = catchAsync(async (req, res, next) => {
  const { id: userId, role } = req.user;
  const { id: cartId } = req.params;
  const cart = await cartService.getCartById(userId, cartId, role);
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    cart,
    "",
    "get Cart successfully"
  );
});

cartController.createCart = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const cart = await cartService.createCart(id);
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    cart,
    "",
    "Create Cart successfully"
  );
});

cartController.updateCartById = catchAsync(async (req, res, next) => {
  const { id: userId, role } = req.user;
  const { id: cartId } = req.params;
  const cart = await cartService.updateCartById(userId, req.body, cartId, role);
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    cart,
    "",
    "Update Cart successfully"
  );
});

cartController.deleteCartById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await cartService.deleteCartById(id);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    {},
    "",
    "Delete cart successfully"
  );
});

module.exports = cartController;
