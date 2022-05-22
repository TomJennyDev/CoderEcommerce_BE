const express = require("express");
const router = express.Router();
const usersRouter = require("./users.api");
const authRouter = require("./auth.api");
const productRouter = require("./product.api");
const categoryRouter = require("./category.api");
const cartRouter = require("./cart.api");
const cartItemRouter = require("./cartItem.api");
const reviewRouter = require("./review.api");
const orderRouter = require("./order.api");
const reactionRouter = require("./reaction.api");
const dashboardRouter = require("./dashboard.api");

/* GET home page. */

router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);
router.use("/cartitem", cartItemRouter);
router.use("/review", reviewRouter);
router.use("/reaction", reactionRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;
