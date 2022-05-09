const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const creditCartSchema = Schema(
  {
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

module.exports = creditCartSchema;
