const jwt = require("jsonwebtoken");
const getToken = require("../helpers/tokenHelper");
const config = require("../config");
const tokenHelper = require("../helpers/tokenHelper");

module.exports = function (req, res, next) {
  const token = getToken.getToken(req);
  if (!token) return res.status(401).send("Unauthorized user");

  try {
    const verified = jwt.verify(
      token,
      tokenHelper.decodeBase64(config.TOKEN_SECRET)
    );
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).send("Access Denied");
  }
};
