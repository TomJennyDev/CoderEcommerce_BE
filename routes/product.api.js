const express = require("express");
const { validate } = require("../middlewares/validate");
const productCtr = require("../controllers/product.controller");
const { logginRequired } = require("../middlewares/passport");
const { productVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");

const router = express.Router();

/* GET products listing. */

router.get(
  "/public",
  //   validate(productVal.getAllProductsPublic, ["body"]),
  productCtr.getAllProducts
);

router.get(
  "/public/:id",
  //   validate(productVal.getAllProductsPublic, ["body"]),
  productCtr.getProductById
);

//adminsitrators
router.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  productCtr.getAllProducts
);

router.get(
  "/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(productVal.getProduct, ["body"]),
  logginRequired,
  isAdmin,
  productCtr.getProductById
);

router.post(
  "/create",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(productVal.createproduct, ["body"]),
  logginRequired,
  isAdmin,
  productCtr.createProduct
);

router.put(
  "/update/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  //   validate(productVal.updateProduct, ["body"]),
  productCtr.updateProductById
);
router.delete(
  "/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  productCtr.deleteProductById
);

module.exports = router;
