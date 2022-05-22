const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const cartItemService = require("../services/cartItem.service");

const cartItemController = {};

cartItemController.addCartItem = catchAsync(async (req, res, next) => {
  const { id: userId } = req.user;
  const { id: productId } = req.params;
  await cartItemService.addCartItem(userId, productId);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    {},
    "",
    "Add item to cart successfully"
  );
});

cartItemController.updateCartItem = catchAsync(async (req, res, next) => {
  const { id: userId } = req.user;
  const totalItem = await cartItemService.updateCartItem(userId, req.body);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    totalItem,
    "",
    "Update Cart item  successfully"
  );
});

cartItemController.deleteCartItem = catchAsync(async (req, res, next) => {
  const { id: userId } = req.user;

  const totalItem = await cartItemService.deleteCartItem(userId, req.body);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    totalItem,
    "",
    "Delete Cart successfully"
  );
});

module.exports = cartItemController;
