const fs = require("fs");
const Order = require("./models/Order");
// const Product = require("./models/Product");

const productService = require("./services/product.service");

// // const brands = [
// //   { title: "Microsoft" },
// //   { title: "acer" },
// //   { title: "lenovo" },
// //   { title: "msi" },
// //   { title: "lenovo" },
// //   { title: "samsung" },
// //   { title: "lg" },
// //   { title: "dell" },
// //   { title: "hp" },
// //   { title: "huawei" },
// //   { title: "huawei" },
// // ];
// (async () =>
//   await Product.deleteMany({ categoryId: "6278e4e919a7ab61193236f9" }))();
// });
// (async () => {
//   let data = fs.readFileSync("./final/pc/graphiccard.json", "utf8");
//   res = JSON.parse(data);
//   // console.log(res);
//   // (async () => await productService.createProduct(res[0]))();

//   res.forEach(async (item) => {
//     await productService.createProduct(item);
//   });
// })();

// (async () => {
//   await Order.deleteMany();
// })();
