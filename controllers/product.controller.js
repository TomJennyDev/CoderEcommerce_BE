const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const Product = require("../models/Product");
const productService = require("../services/product.service");

const productController = {};

productController.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await productService.getAllProducts(req.query, req.user);
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
  const { id } = req.params;
  const product = await productService.getProductById(id);
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
  const product = await productService.createProduct(req.body);
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
  const { id } = req.params;
  const product = await productService.updateProductById(id, req.body);

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
  const { id } = req.params;
  await productService.deleteProductById(id);

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
