function errorHandler(err, req, res) {
  console.log(err, "ini error");

  if (err.code === 400) {
    res.status(400).json({
      message: "Bad Request",
      error: err.error,
    });
  } else if (err.code === 404) {
    res.status(404).json({
      message: "Data not found",
      error: err.error,
    });
  } else if (err.code === 403) {
    res.status(403).json({
      message: "Forbidden",
      error: err.error,
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
}

module.exports = errorHandler;
