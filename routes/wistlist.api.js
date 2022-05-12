const express = require("express");
const { validate } = require("../middlewares/validate");
const wishlistCtr = require("../controllers/wishlist.controller");
const { logginRequired } = require("../middlewares/passport");
const { wishlistVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");

const router = express.Router();

/* GET wishlists listing. */

router.get(
  "/me",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  //   validate(wishlistVal.getAllwishlistsPublic, ["body"]),
  wishlistCtr.getWishlistById
);

router.get(
  "/me/update",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  //   validate(wishlistVal.getAllwishlistsPublic, ["body"]),
  wishlistCtr.updateWishlistById
);

//adminsitrators
router.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  wishlistCtr.getAllCategories
);

router.get(
  "/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(wishlistVal.getwishlist, ["body"]),
  logginRequired,
  isAdmin,
  wishlistCtr.getWishlistById
);

router.post(
  "/create",
  validate(tokenVal.verifyToken, ["headers"]),
  //   validate(wishlistVal.createwishlist, ["body"]),
  logginRequired,
  isAdmin,
  wishlistCtr.createWishlist
);

router.put(
  "/createsub/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  //   validate(wishlistVal.updatewishlist, ["body"]),
  wishlistCtr.createSubWishlist
);

router.put(
  "/update/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  //   validate(wishlistVal.updatewishlist, ["body"]),
  wishlistCtr.updateWishlistById
);

router.delete(
  "/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  wishlistCtr.deleteWishlistById
);

module.exports = router;
