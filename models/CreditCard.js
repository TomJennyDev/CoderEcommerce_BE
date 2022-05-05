const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paginate = require("./plugin/paginate.plugin");
const config = require("../config/config");

const productSchema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, require: true },
    cardNumber: { type: Number, required: true, min: 13, max: 19 },
    expMonth: { type: Date, required: true, min: 1, max: 12 },
    expYear: { type: Date, required: true },
    cardCVV: { type: String, required: true, max: 3 },
    cardIssuer: { type: String, required: true },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

productSchema.plugin(paginate);

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
