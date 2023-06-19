require("dotenv").config();
const PORT = 8081 || process.env.PORT;
const app = require("./app.js");

app.listen(PORT, () => {
  console.log(`server listening at ${PORT}`);
});
