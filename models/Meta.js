const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const config = require("../config/config");

const MetaSchema = Schema(
  {
    key: { type: String, require: true, unique: true },
    content: { type: String, require: true },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Products",
    },
    isHidden: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

MetaSchema.plugin(paginate);

const Meta = mongoose.model("Metas", MetaSchema);
module.exports = Meta;
