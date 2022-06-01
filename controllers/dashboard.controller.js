const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const dashboardService = require("../services/dashboard.service");

const dashboardController = {};

dashboardController.getAllInfoDashboard = catchAsync(async (req, res, next) => {
  const info = await dashboardService.GetAllInfoDashboard(req.query);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    info,
    "",
    "Get All information in Dashboard successfully"
  );
});

module.exports = dashboardController;
