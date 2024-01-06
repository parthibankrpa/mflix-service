require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mflixRoutes = require("./routes/mflixroutes");

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`error on connecting db ${error}`);
});

db.once("open", () => {
  console.log("successfully connected to db");
});

app.use(express.json());
app.use("/mflix/users", mflixRoutes);

app.listen(3000, () => {
  console.log("Server started with 3000", process.env["USERNAME"]);
});
