const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");

const TagSchema = Schema(
  {
    title: { type: String },
    metaTitle: { type: String },
    slug: { type: String },
    isHidden: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

TagSchema.plugin(paginate);

const Tag = mongoose.model("Tags", TagSchema);
module.exports = Tag;
