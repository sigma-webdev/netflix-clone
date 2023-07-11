const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

// Will run validators all the time
mongoose.set("runValidators", true);

const connectDatabase = (() => {
  mongoose
    .connect(MONGODB_URI)
    .then((conn) =>
      console.log(`Connected to MongoDB at: ${conn.connection.host}`)
    )
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
})();

module.exports = connectDatabase;
