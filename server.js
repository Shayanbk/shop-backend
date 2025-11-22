const app = require("./src/app");
const mongoose = require("mongoose");
require("dotenv").config();
const dburl = process.env.DBurl;
mongoose.connect(dburl)
  .then(() => {
    console.log('"✅ DB connection successful!"');
  })
  .catch((err) => {
    console.log("❌ DB connection failed:", err);
  });
app.listen(process.env.PORT, () => {
  console.log(`server running on port:${process.env.PORT}`);
});