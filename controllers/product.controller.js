const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const Product = require("../models/Product");

const productController = {};

productController.getAllProducts = catchAsync(async (req, res, next) => {
  const products = Product.paginate().populate("Descriptions");

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    products,
    "",
    "Get Products successfully"
  );
});

productController.getProductById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    product,
    "",
    "get Product successfully"
  );
});

productController.createProduct = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    product,
    "",
    "Create Product successfully"
  );
});

productController.updateProductById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    product,
    "",
    "Update Product successfully"
  );
});

productController.deleteProductById = catchAsync(async (req, res, next) => {
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    {},
    "",
    "Delete product successfully"
  );
});

module.exports = productController;
