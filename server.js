require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mflixRoutes = require("./routes/mflixroutes");

printIP();
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
  // printIP();
  console.log("Server started with 3000", process.env["USERNAME"]);
});

function printIP() {
  const { networkInterfaces } = require("os");

  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  console.log(JSON.stringify(results));
}
