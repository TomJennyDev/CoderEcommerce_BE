const express = require("express");
const { validate } = require("../middlewares/validate");
const orderCtr = require("../controllers/order.controller");
const { logginRequired } = require("../middlewares/passport");
const { orderVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");

const router = express.Router();

/* GET orders listing. */

router.get(
  "/me",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  //   validate(orderVal.getAllordersPublic, ["body"]),
  orderCtr.getOrderByUser
);

router.post(
  "/me/create",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  //   validate(orderVal.getAllordersPublic, ["body"]),
  orderCtr.createOrder
);

router.put(
  "/me/update",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  //   validate(orderVal.getAllordersPublic, ["body"]),
  orderCtr.updateOrderById
);

//adminsitrators
router.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  orderCtr.getAllOrders
);

router.get(
  "/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(orderVal.getorder, ["body"]),
  logginRequired,
  isAdmin,
  orderCtr.getOrderById
);

router.post(
  "/create",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(orderVal.createorder, ["body"]),
  logginRequired,
  isAdmin,
  orderCtr.createOrder
);

router.put(
  "/update",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  //   validate(orderVal.updateorder, ["body"]),
  orderCtr.updateOrderById
);

router.delete(
  "/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  orderCtr.deleteOrderById
);

module.exports = router;
