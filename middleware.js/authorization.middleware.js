const { verifyAccessJWT } = require("../helpers/jwt.helper");

const userAuthorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    // authorization = "Bearer xxxxxxxxxxxx"
    if (!authorization) return res.status(403).json({ message: "Forbidden" });
    var auth = authorization.split(" ");
    if (auth[0] !== "Bearer")
      return res.status(403).json({ message: "not a bearer token" });

    const decoded = await verifyAccessJWT(auth[1]);

    if (!decoded._id) return res.status(403).json({ message: "Forbidden" });

    req.userId = decoded._id;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { userAuthorization };
