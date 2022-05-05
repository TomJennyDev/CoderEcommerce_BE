const httpStatus = require("http-status");
const { AppError, catchAsync } = require("../helpers/utils");
const Description = require("../models/description");

const descriptionService = {};

descriptionService.checkExistdescription = catchAsync(async function (
  descriptionId
) {
  const description = await Description.findById(descriptionId);
  return !!description;
});

descriptionService.createDescription = catchAsync(async function (description) {
  const description = await Description.create(description);

  return description;
});

module.exports = descriptionService;
