const express = require("express");
const path = require("path");
const volleyball = require("volleyball");
const session = require("express-session");
const passport = require("passport");
const {
  models: { User },
} = require("./db");

const app = express();

const debug = process.env.NODE_ENV === "test";
app.use(volleyball.custom({ debug }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'tJv48TPxrjDmO7swX359B8FN',
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/auth", require('./authRoutes'))
app.use(passport.initialize());

app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || "Internal server error");
});

module.exports = app;
