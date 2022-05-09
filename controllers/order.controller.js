const httpStatus = require("http-status");
const { sendResponse, catchAsync } = require("../helpers/utils");
const Order = require("../models/Order");
const orderService = require("../services/order.service");

const orderController = {};

orderController.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await orderService.getAllOrders(req);
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    orders,
    "",
    "Get Orders successfully"
  );
});

orderController.getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await orderService.getOrderById(id);
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    order,
    "",
    "get Order successfully"
  );
});

orderController.createOrder = catchAsync(async (req, res, next) => {
  const order = await orderService.getOrderById(req.body);
  return sendResponse(
    res,
    httpStatus.OK,
    true,
    order,
    "",
    "Create Order successfully"
  );
});

orderController.updateOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await orderService.updateOrderById(id, req.body);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    order,
    "",
    "Update Order successfully"
  );
});

orderController.deleteOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await orderService.deleteOrderById(id);

  return sendResponse(
    res,
    httpStatus.OK,
    true,
    {},
    "",
    "Delete order successfully"
  );
});

module.exports = orderController;
