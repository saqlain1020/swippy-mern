require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.MONGO_STRING.replace(
  "<password>",
  process.env.MONGO_PASSWORD
);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((con) => {
    console.log("connected to mogndodb");
  });

app.listen(process.env.PORT, () => {
  console.log("server running on port", process.env.PORT);
});