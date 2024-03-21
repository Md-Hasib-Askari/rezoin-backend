const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");

module.exports = (req, res, next) => {
  let token = req.headers["token-key"];
  if (!token) {
    return res
      .status(401)
      .json({ status: "unauthorized", message: "No token provided" });
  }
  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      return res
        .status(401)
        .json({ status: "unauthorized", message: "Invalid token" });
    } else {
      req.headers.email = decoded["data"];
      next();
    }
  });
};
