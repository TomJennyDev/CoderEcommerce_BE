const express = require("express");
const { validate } = require("../middlewares/validate");
const categoryCtr = require("../controllers/category.controller");
const { logginRequired } = require("../middlewares/passport");
const { categoryVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");

const router = express.Router();

/* GET categorys listing. */

router.get(
  "/public",
  //   validate(categoryVal.getAllcategorysPublic, ["body"]),
  categoryCtr.getAllCategories
);

router.get(
  "/public/:id",
  //   validate(categoryVal.getAllcategorysPublic, ["body"]),
  categoryCtr.getCategoryById
);

//adminsitrators
router.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  categoryCtr.getAllCategories
);

router.get(
  "/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(categoryVal.getcategory, ["body"]),
  logginRequired,
  isAdmin,
  categoryCtr.getCategoryById
);

router.post(
  "/create",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(categoryVal.createcategory, ["body"]),
  logginRequired,
  isAdmin,
  categoryCtr.createCategory
);

router.put(
  "/createsub/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  //   validate(categoryVal.updatecategory, ["body"]),
  categoryCtr.createSubCategory
);

router.put(
  "/update/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  //   validate(categoryVal.updatecategory, ["body"]),
  categoryCtr.updateCategoryById
);

router.delete(
  "/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  categoryCtr.deleteCategoryById
);

module.exports = router;
