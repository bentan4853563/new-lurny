// /* eslint-disable no-undef */
// const path = require("path");
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// require("dotenv").config();

// const app = express();

// connectDB();

// app.use(express.json({ limit: "500mb" }));
// app.use(express.urlencoded({ extended: true }));

// app.use(cors());

// app.use("/api/lurny", require("./routes/api/lurnyRoutes"));
// app.use("/api/auth", require("./routes/api/newAuth"));

// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("dist"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
//   });
// }

// const PORT = process.env.PORT || 5009;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server started on ${PORT}`);
// });

/* eslint-disable no-undef */
const path = require("path");
const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/lurny.net/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/lurny.net/cert.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/live/lurny.net/chain.pem"),
};

const app = express();

connectDB();

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/lurny", require("./routes/api/lurnyRoutes"));
app.use("/api/auth", require("./routes/api/newAuth"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 443;

https.createServer(options, app).listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on ${PORT}`);
});
