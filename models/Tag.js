const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");

const TagSchema = Schema(
  {
    title: { type: String },
    slug: { type: String },

    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

TagSchema.plugin(paginate);

const Tag = mongoose.model("Tags", TagSchema);
module.exports = Tag;
