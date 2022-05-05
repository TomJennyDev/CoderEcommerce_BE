const {
  validationResult,
  matchedData,
  checkSchema,
} = require("express-validator");
const { sendResponse } = require("../helpers/utils");
const validators = {};

validators.validate = (schema, locations) => async (req, res, next) => {
  const validationArray = checkSchema(schema, locations);

  await Promise.all(validationArray.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    locations.forEach((location) => {
      req[location] = matchedData(req, {
        includeOptionals: true,
        locations: [location],
      });
    });
    return next();
  }
  console.log(errors.array());
  const message = errors
    .array()
    .map((error) => {
      if (error.msg.trim().toLowerCase() === "invalid value") {
        return error.msg.trim().replace(" ", ` ${error.param} `);
      }
      return error.msg;
    })
    .join(" & ");

  return sendResponse(res, 422, false, null, { message }, "Validation Error");
};

module.exports = validators;
