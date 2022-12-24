const handleError = (error, res) => {
  res.json({
    message: error.message,
    status: error.status || 500,
  });
};

module.exports = { handleError };
