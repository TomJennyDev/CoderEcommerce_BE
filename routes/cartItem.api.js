const express = require("express");
const { validate } = require("../middlewares/validate");
const { logginRequired } = require("../middlewares/passport");
const { cartItemVal, tokenVal } = require("../validation");

const cartItemCtr = require("../controllers/cartItem.controller");

const router = express.Router();

/* GET carts listing. */

router.put(
  "/me/update",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  //   validate(cartVal.getAllcartsPublic, ["body"]),
  cartItemCtr.updateCartItem
);

router.delete(
  "/me/delete",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  //   validate(cartVal.getAllcartsPublic, ["body"]),
  cartItemCtr.deleteCartItem
);

module.exports = router;
