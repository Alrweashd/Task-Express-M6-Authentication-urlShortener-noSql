const connectDb = require("./database");
const express = require("express");
const app = express();
const urlRoutes = require("./api/urls/urls.routes");
const userRoutes = require("./api/users/users.routes");
//for logs
const morgan = require("morgan");
app.use(morgan("dev"));
//for auth login
const passport = require("passport");
app.use(passport.initialize());
//different strategies, one for users and the other for urls, allowing only the authorized user to modify.
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
passport.use(localStrategy);
passport.use(jwtStrategy);
connectDb();

app.use(express.json());

app.use("/urls", urlRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
