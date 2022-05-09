const express = require("express");
const { validate } = require("../middlewares/validate");
const cartCtr = require("../controllers/cart.controller");
const { logginRequired } = require("../middlewares/passport");
const { cartVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");
const cartItemCtr = require("../controllers/cartItem.controller");

const router = express.Router();

/* GET carts listing. */

router.get(
  "/me",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  //   validate(cartVal.getAllcartsPublic, ["body"]),
  cartCtr.getCartById
);

router.post(
  "/me/create",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  //   validate(cartVal.getAllcartsPublic, ["body"]),
  cartCtr.createCart
);

router.put(
  "/me/update",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  //   validate(cartVal.getAllcartsPublic, ["body"]),
  cartCtr.updateCartById
);

//adminsitrators
router.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  cartCtr.getAllCarts
);

router.get(
  "/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(cartVal.getcart, ["body"]),
  logginRequired,
  isAdmin,
  cartCtr.getCartById
);

router.put(
  "/update/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  //   validate(cartVal.updatecart, ["body"]),
  cartCtr.updateCartById
);

router.delete(
  "/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  cartCtr.deleteCartById
);

module.exports = router;
