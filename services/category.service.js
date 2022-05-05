const httpStatus = require("http-status");
const { AppError, catchAsync } = require("../helpers/utils");
const Category = require("../models/Category");

const categoryService = {};

categoryService.checkExistCategory = catchAsync(async function (categoryId) {
  const category = await Category.findById(categoryId);
  return !!category;
});

categoryService.createCatgory = catchAsync(async function (category) {
  const category = await Category.create(category);

  return category;
});

module.exports = categoryService;
