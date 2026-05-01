const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Override dns.lookup to use Google DNS (dns.resolve4) instead of
// the OS getaddrinfo which uses the system DNS that can't resolve MongoDB hosts
const originalLookup = dns.lookup;
dns.lookup = function (hostname, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return originalLookup.call(dns, hostname, options, callback);
  }
  dns.resolve4(hostname, (err, addresses) => {
    if (err) {
      return originalLookup.call(dns, hostname, options, callback);
    }
    if (typeof options === "object" && options.all) {
      callback(null, addresses.map((addr) => ({ address: addr, family: 4 })));
    } else {
      callback(null, addresses[0], 4);
    }
  });
};

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

