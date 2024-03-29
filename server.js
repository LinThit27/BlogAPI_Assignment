const express = require("express");
const env = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routers/index");
const { handler } = require("./middleware/error.handler");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: process.env.CLIENT_PORT,
    credentials: true,
  })
);

require("./config/db")();
app.use("/api/v1", router);
app.listen(process.env.PORT, function () {
  console.log("Server listening on", process.env.PORT);
});
app.use(handler);
