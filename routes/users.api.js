const express = require("express");
const { validate } = require("../middlewares/validate");
const UserCtr = require("../controllers/user.controllers");
const { logginRequired } = require("../middlewares/passport");
const { userVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");

const router = express.Router();

/* GET users listing. */
//customers
router.post(
  "/",
  validate(userVal.createUser, ["body"]),
  UserCtr.createUserByEmailPassword
);

router.get(
  "/me",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  UserCtr.getCurrentUser
);
router.put(
  "/me/update",
  validate(tokenVal.verifyToken, ["headers"]),
  validate(userVal.updateUser, ["body"]),
  logginRequired,
  UserCtr.updateCurrentUser
);
router.delete(
  "/me/delete",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  UserCtr.deleteCurrentUser
);

// administrators
router.post(
  "/create",
  validate(userVal.createUser, ["body"]),
  UserCtr.createUserByEmailPassword
);

router.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  validate(userVal.getUsers, ["headers"]),
  logginRequired,
  isAdmin,
  UserCtr.getAllUsersList
);
router.get(
  "/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  UserCtr.getSingleUserById
);
router.put(
  "/update/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  validate(userVal.updateUserWithAdmin, ["body"]),
  UserCtr.updateUserById
);
router.delete(
  "/delete/:id",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  UserCtr.deleteUserById
);

module.exports = router;
