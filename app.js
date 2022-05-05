const express = require("express");
const httpStatus = require("http-status");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const helmet = require("helmet");

const { sendResponse } = require("./helpers/utils");
const indexRouter = require("./routes/index");
const passport = require("passport");

const app = express();

app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

require("./config/connectDB");

app.use("/v1", indexRouter);

// jwt authentication
app.use(passport.initialize());

// catch 404 and forard to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

/* Initialize Error Handling */
app.use((err, req, res, next) => {
  console.log("Error", err);

  // handle error for passport login authentication
  if (err.oauthError) {
    const { statusCode, data } = err.oauthError;
    err.statusCode = statusCode;
    err.message = "Invalid access token";
    err.errorType = "Get access token";
    return sendResponse(
      res,
      err.statusCode,
      false,
      null,
      { message: err.message },
      err.errorType
    );
  }

  if (err.isOperational) {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : httpStatus.INTERNAL_SERVER_ERROR,
      false,
      null,
      { message: err.message },
      err.errorType
    );
  } else {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : httpStatus.INTERNAL_SERVER_ERROR,
      false,
      null,
      { message: err.message },
      "Internal Server Error"
    );
  }
});

module.exports = app;
