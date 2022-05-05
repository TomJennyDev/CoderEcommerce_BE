const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const config = require("../config/config");

const AttributeSchema = Schema(
  {
    title: { type: String, required: true },
    metaTile: { type: String },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

AttributeSchema.plugin(paginate);

const Attributes = mongoose.model("Attributes", AttributeSchema);
module.exports = Attributes;
