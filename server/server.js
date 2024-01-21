const express = require("express");
const morgan = require("morgan");
const http = require("http");
const fs = require("fs");
const path = require("path");
const api = require("./routes/api");
const { mongoConnect } = require("./services/mongo");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// DASHBOARD API
app.use("/", api);

async function startServer() {
  await mongoConnect();

  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
}

startServer();
