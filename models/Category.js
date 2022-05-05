const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const config = require("../config/config");

const categorySchema = Schema(
  {
    title: { type: String },
    metaTitle: { type: String },
    slug: { type: String },
    trim: true,
    lowercase: true,
    isHidden: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    subCatogory: [this],
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

categorySchema.plugin(paginate);

const Category = mongoose.model("Categories", categorySchema);
module.exports = Category;
