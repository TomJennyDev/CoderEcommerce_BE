// const Category = require("./models/Category");
// const { createCategory } = require("./services/category.service");
const fs = require("fs");
const Category = require("./models/Category");
const Product = require("./models/Product");
const productService = require("./services/product.service");

// // categories
// const catogories = [
//   {
//     title: "Components",
//     icon: "DevicesIcon",
//   },
//   {
//     title: "Computers",
//     icon: "ImportantDevicesIcon",
//   },
//   {
//     title: "Cameras&Video",
//     icon: "CameraIcon",
//   },
//   {
//     title: "Headphones",
//     icon: "HeadphonesIcon",
//   },
//   {
//     title: "Office",
//     icon: "PrintIcon",
//   },
//   {
//     title: "Smart Watch",
//     icon: "WatchIcon",
//   },
//   {
//     title: "Phones",
//     icon: "PhoneIphoneIcon",
//   },
// ];
// // (async () => await Category.insertMany(catogories))();

// const subcatogoriesL1 = [
//   {
//     title: "Core Components",
//     parent: "6278e4e919a7ab61193236f5",
//   },
//   {
//     title: "Storages devices",
//     parent: "6278e4e919a7ab61193236f5",
//   },
//   {
//     title: "Accessories",
//     parent: "6278e4e919a7ab61193236f5",
//   },
// ];
// // (async () => await Category.insertMany(subcatogoriesL1))();

// const subcatogoriesL21 = [
//   {
//     title: "Memory",
//     parent: "6278e51423d8a01922e9f708",
//   },
//   {
//     title: "Motherboards",
//     parent: "6278e51423d8a01922e9f708",
//   },
//   {
//     title: "Power Supply",
//     parent: "6278e51423d8a01922e9f708",
//   },
//   {
//     title: "Computer Case",
//     parent: "6278e51423d8a01922e9f708",
//   },
//   {
//     title: "Video Cards",
//     parent: "6278e51423d8a01922e9f708",
//   },
//   {
//     title: "Fans",
//     parent: "6278e51423d8a01922e9f708",
//   },
// ];
// (async () => await Category.insertMany(subcatogoriesL21))();

// const subcatogoriesL22 = [
//   {
//     title: "HDD",
//     parent: "6278e51423d8a01922e9f709",
//   },
//   {
//     title: "SSDs",
//     parent: "6278e51423d8a01922e9f709",
//   },
//   {
//     title: "Backup Devices",
//     parent: "6278e51423d8a01922e9f709",
//   },
//   {
//     title: "USB and Memory",
//     parent: "6278e51423d8a01922e9f709",
//   },
//   {
//     title: "Network portable",
//     parent: "6278e51423d8a01922e9f709",
//   },
// ];
// (async () => await Category.insertMany(subcatogoriesL22))();

// const subcatogoriesL23 = [
//   {
//     title: "Thermal Compounds",
//     parent: "6278e51423d8a01922e9f70a",
//   },
//   {
//     title: "Adapters & Gender Changers",
//     parent: "6278e51423d8a01922e9f70a",
//   },
//   {
//     title: "KVM Switches",
//     parent: "6278e51423d8a01922e9f70a",
//   },
//   {
//     title: "Hubs",
//     parent: "6278e51423d8a01922e9f70a",
//   },
// ];

// (async () => await Category.insertMany(subcatogoriesL23))();

// (async () => await Category.deleteMany({}))();
// Category.deleteMany({});

// const brands = [
//   { title: "Microsoft" },
//   { title: "acer" },
//   { title: "lenovo" },
//   { title: "msi" },
//   { title: "lenovo" },
//   { title: "samsung" },
//   { title: "lg" },
//   { title: "dell" },
//   { title: "hp" },
//   { title: "huawei" },
//   { title: "huawei" },
// ];
// (async () => await Product.deleteMany({}))();

// let data = fs.readFileSync("./final/smartwatch.json", "utf8");
// res = JSON.parse(data);
// // console.log(res);
// (async () => await productService.createProduct(res[0]))();

// res.forEach(async (item) => {
//   await productService.createProduct(item);
// console.log(item.images.length === 0 ? item.variants[0] : []);
// result.push(product);
// });
