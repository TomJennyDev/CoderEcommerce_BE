const express = require("express");
const { checkSchema } = require("express-validator");

const {
  loginUserWithEmailPassword,
  loginUserWithGoogle,
  loginUserWithFacebook,
} = require("../controllers/auth.controllers");
const { loginGoogle, loginFacebook } = require("../middlewares/passport");
const { validate } = require("../middlewares/validate");
const authVal = require("../validation/auth.validation");

const router = express.Router();

/* GET users listing. */
// validate(login)
router.post(
  "/login",
  validate(authVal.login, ["body"]),
  loginUserWithEmailPassword
);

router.post("/google", loginGoogle, loginUserWithGoogle);

router.post("/facebook", loginFacebook, loginUserWithFacebook);

module.exports = router;
