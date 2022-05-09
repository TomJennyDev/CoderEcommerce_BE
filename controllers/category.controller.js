const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const categoryService = require("../services/category.service");

const categoryController = {};

categoryController.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await categoryService.getAllCatgories(req);
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    categories,
    "",
    "Get Categories successfully"
  );
});

categoryController.getCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await categoryService.getCategoryById(id);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    category,
    "",
    "Get Category successfully"
  );
});

categoryController.createCategory = catchAsync(async (req, res, next) => {
  const category = await categoryService.createCategory(req.body);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    category,
    "",
    "Create Category successfully"
  );
});

categoryController.createSubCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryService.updateCategoryById(id, req.body);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    category,
    "",
    "Create Category successfully"
  );
});

categoryController.updateCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryService.updateCategoryById(id, req.body);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    category,
    "",
    "Update Category successfully"
  );
});

categoryController.deleteCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await categoryService.deleteCategoryById(id);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    {},
    "Delete Category successfully"
  );
});

module.exports = categoryController;
