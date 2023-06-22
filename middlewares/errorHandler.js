const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
  err.name = err._message;
  console.log(err);

  return res
    .status(err.status || 500)
    .json({ msg: err.msg } || { msg: "Internal Server Error" });
};
module.exports = errorHandler;
