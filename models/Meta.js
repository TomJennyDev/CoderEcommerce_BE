const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const config = require("../config/config");

const metaSchema = Schema(
  {
    key: { type: String, require: true, unique: true },
    content: { type: String, require: true },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Products",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

metaSchema.plugin(paginate);

const Meta = mongoose.model("Metas", metaSchema);
module.exports = Meta;
