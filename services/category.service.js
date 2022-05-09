const httpStatus = require("http-status");
const { AppError, catchAsync } = require("../helpers/utils");
const Category = require("../models/Category");

const categoryService = {};

categoryService.checkExistCategory = async function (cateId) {
  const category = await Category.findById(cateId);
  return !!category;
};

categoryService.getAllCatgories = async function (req) {
  const category = await Category.getAllCategory();

  return category;
};

categoryService.getChildCategoryById = async function (cateId) {
  const category = await Category.getChildCategoryById();

  if (!category) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Category not found",
      "Find Category By Id"
    );
  }

  return category;
};

categoryService.createCategory = async function (cateBody) {
  const category = await Category.create(cateBody);

  return category;
};

categoryService.updateCategoryById = async function (cateId, cateBody) {
  let category = await Category.findById(cateId);

  if (!category) {
    throw new AppError(404, "Category Not Found", "Update Category");
  }
  Object.keys(cateBody).forEach((field) => {
    if (cateBody[field] !== undefined) {
      category[field] = cateBody[field];
    }
  });

  await category.save();

  // return category;
};

categoryService.deleteCategoryById = async function (cateId) {
  const category = await Category.updateById(cateId, { isDeleted: false });

  return category;
};

module.exports = categoryService;
