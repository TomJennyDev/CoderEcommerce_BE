const express = require("express");
const { checkSchema } = require("express-validator");

const authCtr = require("../controllers/auth.controllers");
const { loginGoogle, loginFacebook } = require("../middlewares/passport");
const { validate } = require("../middlewares/validate");
const authVal = require("../validation/auth.validation");

const router = express.Router();

/* GET users listing. */
// validate(login)
router.post(
  "/login",
  validate(authVal.login, ["body"]),
  authCtr.loginUserWithEmailPassword
);

router.post("/google", loginGoogle, authCtr.loginUserWithGoogle);

router.post("/facebook", loginFacebook, authCtr.loginUserWithFacebook);

router.post(
  "/resetpassword",
  validate(authVal.resetPassword, ["body"]),
  authCtr.resetUserPasswordWithEmail
);

module.exports = router;
