const httpStatus = require("http-status");
const { AppError, catchAsync } = require("../helpers/utils");
const Tag = require("../models/tag");

const tagService = {};

tagService.checkExistTag = catchAsync(async function (tagId) {
  const tag = Tag.findById(tagId);
  return !!tag;
});

tagService.createTag = catchAsync(async function (tag) {
  const tag = Tag.create(tag);

  return tag;
});

module.exports = tagService;
