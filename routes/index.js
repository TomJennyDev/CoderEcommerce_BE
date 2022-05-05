const express = require("express");
const router = express.Router();
const usersRouter = require("./users.api");
const authRouter = require("./auth.api");
const productRouter = require("./product.api");

/* GET home page. */

router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/product", productRouter);

module.exports = router;
