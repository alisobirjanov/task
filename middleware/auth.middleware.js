const jwt = require("jsonwebtoken");
const config = require("config");
const User = require('../models/User')

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: "Нет авторизации" });
    }

    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = await User.findById(decoded.user)
    next();
  } catch (e) {
    res.status(401).json({ message: "Нет авторизации" });
  }
};
