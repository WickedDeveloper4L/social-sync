const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const passport = require("passport");
const path = require("path");
const { Strategy } = require("passport-google-oauth20");
const api = require("./routes/api");
const { mongoConnect } = require("./services/mongo");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));

// DASHBOARD API
app.use("/", api);

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google profile:", profile);
  done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

app.use(passport.initialize());
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);
app.get("/profile", (req, res) => {
  res.status(200).json();
});
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "http://localhost:5173/dashboard",
    session: false,
  }),
  (req, res) => {
    console.log("Google called us back!");
  }
);

const server = https.createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app
);

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
}

startServer();
