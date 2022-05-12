const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const config = require("../config/config");

const attributeSchema = Schema(
  {
    title: { type: String, required: true },
    parent: { type: String, ref: "Attributes" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

attributeSchema.plugin(paginate);

const Attributes = mongoose.model("Attributes", attributeSchema);
module.exports = Attributes;
