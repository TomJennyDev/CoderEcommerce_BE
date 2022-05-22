const express = require("express");
const { validate } = require("../middlewares/validate");
const reactionCtr = require("../controllers/reaction.controller");
const { logginRequired } = require("../middlewares/passport");
const { reactionVal, tokenVal } = require("../validation");
const router = express.Router();

router.post(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  reactionCtr.createReaction
);

module.exports = router;
