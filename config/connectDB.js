const mongoose = require("mongoose");
const config = require("./config");

/* DB Connection */
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    require("../createMock");

    console.log(`DB connected`);
  })
  .catch((err) => console.log(err));
