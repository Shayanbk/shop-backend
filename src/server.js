const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const dburl = process.env.DBURL;
mongoose
  .connect(dburl)
  .then(() => {
    console.log("✅ DB connection successful!");
  })
  .catch((err) => {
    console.log("❌ DB connection failed:", err);
  });
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server ron on port ${port}`);
});
