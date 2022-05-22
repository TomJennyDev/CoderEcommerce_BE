const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const Reaction = require("../models/Reaction");
const reactionService = require("../services/reaction.service");

const reactionController = {};

reactionController.getReaction = catchAsync(async (req, res, next) => {
  const reactions = await reactionService.getAllReactions(req.query);
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    reactions,
    "",
    "Get Reactions successfully"
  );
});

reactionController.createReaction = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const reaction = await reactionService.createReaction(id, req.body);
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    reaction,
    "",
    "Create Reaction successfully"
  );
});

module.exports = reactionController;
