const userAuthorization = (req, res, next) => {
  const { authorization } = req.header;

  next();
};

module.exports = { userAuthorization };
