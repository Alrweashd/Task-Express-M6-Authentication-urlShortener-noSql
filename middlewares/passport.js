const LocalStrategy = require("passport-local");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(
  { usernameField: "username" },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false);
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
