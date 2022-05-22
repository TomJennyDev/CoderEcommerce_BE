const express = require("express");
const { validate } = require("../middlewares/validate");
const dashboardCtr = require("../controllers/dashboard.controller");
const { logginRequired } = require("../middlewares/passport");
const { dashboardVal, tokenVal } = require("../validation");
const { isAdmin } = require("../middlewares/authorization");
const router = express.Router();

router.get(
  "/",
  validate(tokenVal.verifyToken, ["headers"]),
  logginRequired,
  isAdmin,
  dashboardCtr.getAllInfoDashboard
);

module.exports = router;
