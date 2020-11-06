const router = require("express").Router();
const {
  models: { User },
} = require("./db");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

router.get("/", passport.authenticate("google", { scope: "email" }));

router.get(
  "/callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/",
  })
);

const googleCredentials = {
  clientID:
    process.env.GOOGLE_CLIENT_ID ||
    "651661511160-mk9ngbj6cuag0hbb7mmr932ue5cocds2.apps.googleusercontent.com",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "tJv48TPxrjDmO7swX359B8FN",
  callbackURL: "/auth/google/callback",
};

const verificationCallback = async (token, refreshToken, profile, done) => {
  const info = {
    email: profile.emails[0].value,
    imageUrl: profile.photos ? profile.photos[0].value : undefined,
  };

  try {
    const [user] = await User.findOrCreate({
      where: { googleId: profile.id },
      defaults: info,
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
};

const strategy = new GoogleStrategy(googleCredentials, verificationCallback);

passport.use(strategy);

module.exports = router;
