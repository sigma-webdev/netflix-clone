const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

const connectDatabase = (() => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("connected to mongoDb"))
    .catch((error) => console.log(error));
})();

module.exports = connectDatabase();