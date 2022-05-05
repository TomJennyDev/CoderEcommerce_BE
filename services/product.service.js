const httpStatus = require("http-status");
const { AppError, catchAsync } = require("../helpers/utils");

const productService = {};

productService.checkExistProduct = catchAsync(async function (ProductId) {
  const Product = Product.findById(ProductId);
  return !!Product;
});

productService.createProduct = catchAsync(async function (Product) {
  const Product = Product.create(Product);

  return user;
});

module.exports = productService;
