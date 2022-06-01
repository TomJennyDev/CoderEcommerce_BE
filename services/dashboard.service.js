const httpStatus = require("http-status");
const { AppError, catchAsync } = require("../helpers/utils");

const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

const dashboardService = {};

dashboardService.GetAllInfoDashboard = async function (queryDashboard) {
  let { rangeDays } = queryDashboard;
  rangeDays = rangeDays
    .split(",")
    .map((date) => new Date(+date))
    .reverse();

  const startDays = rangeDays[0];
  const endDays = new Date(
    rangeDays[rangeDays.length - 1].setUTCHours(23, 59, 59, 999)
  );

  const d = new Date();
  let month = d.getMonth();
  let year = d.getFullYear();

  const info = {
    revenue: 0,
    totalCustomer: 0,
    totalOrder: 0,
    totalProduct: 0,
    lastestOrders: [],
  };

  const templateGetOrdersByDate = [
    {
      $match: {
        createdAt: {
          $gte: startDays,
          $lte: endDays,
        },
      },
    },
    {
      $project: {
        days: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
      },
    },
    {
      $group: {
        _id: "$days",
        count: { $count: {} },
      },
    },
    {
      $project: {
        _id: 0,
        day: "$_id",
        count: 1,
      },
    },
  ];

  const templateCountByMonth = [
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: { $count: {} },
      },
    },
    {
      $match: {
        "_id.month": { $gte: month, $lte: month + 1 },
        "_id.year": year,
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        count: 1,
      },
    },
  ];

  const templateSumByMonth = [
    {
      $match: {
        status: "delivered",
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: { $count: {} },
        total: { $sum: "$payment.total.total" },
      },
    },
    {
      $match: {
        "_id.month": { $gte: month, $lte: month + 1 },
        "_id.year": year,
      },
    },
    {
      $project: { _id: 0, month: "$_id.month", total: 1, count: 1 },
    },
  ];

  const totalCustomer = await User.aggregate(templateCountByMonth);
  const totalProduct = await Product.aggregate(templateCountByMonth);
  const totalOrder = await Order.aggregate(templateCountByMonth);
  const revenue = await Order.aggregate(templateSumByMonth);

  const lastestOrders = await Order.aggregate(templateGetOrdersByDate);

  info.totalCustomer = totalCustomer;
  info.totalProduct = totalProduct;
  info.totalOrder = totalOrder;
  info.revenue = revenue;
  info.lastestOrders = lastestOrders;

  return info;
};

module.exports = dashboardService;
