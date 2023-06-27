require("dotenv").config();

const app = require("./app.js");

const PORT = 8081 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
