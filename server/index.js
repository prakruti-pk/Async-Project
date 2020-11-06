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
    secret: "tJv48TPxrjDmO7swX359B8FN",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/auth", require('./authRoutes'))
app.use(passport.initialize());

// this will invoke our registered 'deserializeUser' method
// and attempt to put our user on 'req.user'
app.use(passport.session());

// after we find or create a user, we 'serialize' our user on the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// If we've serialized the user on our session with an id, we look it up here
// and attach it as 'req.user'.
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Static middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// authentication router
// app.use('/auth', require('./auth'))

// For all GET requests that aren't to an API route,
// we will send the index.html!
app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Handle 404s
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handling endware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || "Internal server error");
});

module.exports = app;
