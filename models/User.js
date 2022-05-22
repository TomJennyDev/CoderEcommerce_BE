const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const paginate = require("./plugin/paginate.plugin");
const config = require("../config/config");
const toJSON = require("./plugin/toJSON.plugin");
const creditCartSchema = require("./CreditCard");
const autoPopulate = require("mongoose-autopopulate");

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isDeleted: { type: Boolean, default: false },
    phone: { type: Number },
    address: { type: String },
    avatarUrl: { type: String },
    role: {
      type: String,
      enum: Object.keys(config.role),
      default: config.role.user,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
      unique: true,
    },
    facebookId: {
      type: String,
      unique: true,
    },
    creditCards: [creditCartSchema],

    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Carts",
      require: true,
      unique: true,
    },
    isResetPassword: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.methods.generateToken = function () {
  const user = this;

  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    config.jwt.secret,
    {
      expiresIn: config.jwt.accessExpiration,
    }
  );

  return accessToken;
};

userSchema.methods.filterOutputUser = function () {
  const obj = this._doc;

  delete obj.__v;
  delete obj.password;
  delete obj.isDeleted;
  delete obj.isEmailVerified;
  delete obj.createdAt;
  delete obj.updatedAt;

  return obj;
};

userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("Users", userSchema);
module.exports = User;
