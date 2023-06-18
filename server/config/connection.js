const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/out-and-about"
);

module.exports = mongoose.connection;
