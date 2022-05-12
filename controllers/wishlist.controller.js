const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");

const wishListController = {};

wishListController.getAllWishlist = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Wishlist,
    "",
    "Wishlist is login successfully"
  );
});

wishListController.getWishlistById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Wishlist,
    "",
    "Wishlist is login successfully"
  );
});

wishListController.updateWishlistById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    Wishlist,
    "",
    "Wishlist is login successfully"
  );
});

wishListController.deleteWishlistById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    {},
    "",
    "Wishlist is login successfully"
  );
});

module.exports = wishListController;
