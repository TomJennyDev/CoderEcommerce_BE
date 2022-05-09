const httpStatus = require("http-status");
const { AppError, catchAsync } = require("../helpers/utils");
const Order = require("../models/Order");

const orderService = {};

orderService.checkExistOrder = async function (OrderId) {
  const order = Order.findById(OrderId);
  return !!order;
};

orderService.getAllOrders = async function (query) {
  const orders = await Order.paginate(query);

  return orders;
};

orderService.getOrderById = async function (orderId) {
  const order = await Order.findById(orderId);

  if (!orderId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Order is not found",
      "Get single order"
    );
  }
  return order;
};

orderService.createOrder = async function (orderBody) {
  const order = await Order.create(orderBody);

  return order;
};

orderService.updateOrderById = async function (orderId, orderBody) {
  let order = await Order.findById(orderId);

  if (!order) {
    throw new AppError(404, "Order Not Found", "Update order");
  }

  Object.keys(orderBody).forEach((field) => {
    if (orderBody[field] !== undefined) {
      order[field] = orderBody[field];
    }
  });
  return order;
};

orderService.deleteOrderById = async function (orderId) {
  const order = await Order.findByIdAndUpdate(orderId, {
    isDeleted: true,
  });
  if (!order) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Order is not found",
      "Delete single order"
    );
  }
  return order;
};

module.exports = orderService;
