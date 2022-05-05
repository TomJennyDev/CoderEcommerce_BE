const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const config = require("../config/config");

const DescriptionSchema = Schema(
  {
    content: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

DescriptionSchema.plugin(paginate);

const Description = mongoose.model("Descriptions", DescriptionSchema);
module.exports = Description;
