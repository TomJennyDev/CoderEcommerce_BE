const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const productService = require("../services/product.service");
const categoryService = require("../services/category.service");
const { AppError } = require("../helpers/utils");
const httpStatus = require("http-status");

const ProductCategorySchema = Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Products",
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Categories",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

ProductCategorySchema.pre("save", async function (next) {
  const prodCate = this;

  const isProductExist = await productService.checkExistProduct(
    prodCate.productId
  );
  if (!isProductExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Product is not Found",
      "Create Product Category"
    );
  }

  const isCategoryExist = await categoryService.checkExistCategory(
    prodCate.categoryId
  );
  if (!isCategoryExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Category is not Found",
      "Create Product Category"
    );
  }

  next();
});

const ProductCategory = mongoose.model(
  "ProductCategorys",
  ProductCategorySchema
);
module.exports = ProductCategory;
