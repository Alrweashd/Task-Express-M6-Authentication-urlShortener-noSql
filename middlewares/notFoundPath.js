const notFoundPath = (req, res, next) => {
  //accessing the errorHandler function
  res.status(404).json({ msg: "page not found" });
  return next();
};
module.exports = notFoundPath;
