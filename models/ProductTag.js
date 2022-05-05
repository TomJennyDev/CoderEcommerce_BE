const httpStatus = require("http-status");
const mongoose = require("mongoose");
const tagService = require("../services/tag.api");
const Schema = mongoose.Schema;

const ProductTagSchema = Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Products",
    },
    tagId: { type: Schema.Types.ObjectId, required: true, ref: "Tags" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

ProductTagSchema.pre("save", async function (next) {
  const prodTag = this;

  const isProductExist = await productService.checkExistProduct(
    prodTag.productId
  );
  if (!isProductExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Product is not Found",
      "Create Product Tag"
    );
  }

  const isTagExist = await tagService.checkExistTag(prodTag.TagId);
  if (!isTagExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Tag is not Found",
      "Create Product Tag"
    );
  }

  next();
});

const ProductTag = mongoose.model("ProductTags", ProductTagSchema);
module.exports = ProductTag;
