const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Smart Food Management & Redistribution System API is running");
});

const URL = process.env.MONGODB_URI;

if (URL) {
  mongoose
    .connect(URL)
    .then(() => {
      console.log("Mongodb Connection success!");
    })
    .catch((err) => {
      console.error("Mongodb Connection error:", err.message);
    });
} else {
  console.log("No MONGODB_URI provided in .env file.");
}

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});


