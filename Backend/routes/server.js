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

const URL = process.env.MONGODB_URI;

mongoose.connect(URL);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

const connection = mongoose.connection;
connection.once("open", () => {
console.log("Mongodb Connection success!");
})

