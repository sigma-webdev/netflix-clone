const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

// Wil run validatos all the time
// mongoose.set("runValidators", true);
const connectDatabase = (() => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("connected to mongoDb"))
    .catch((error) => console.log(error));
})();

module.exports = connectDatabase;
