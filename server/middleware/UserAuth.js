const jwt = require("jsonwebtoken");
const secret = "thisisasecretok";

module.exports = (req, res, next) => {
  const authToken = req.headers['authorization'];

  if (authToken != undefined) {
    const bearer = authToken.split(' ');
    const token = bearer[1];

    const decoded = jwt.verify(token, secret);

    if (decoded.role > 0) {
      email = decoded.email;

      req.email = email;
      req.id = id;

      return next();
    } else {
      return res.status(400).json({ error: "You don\'t have authentication for this" });
    }
  } else {
    return res.status(400).json({ error: "Failed on authentication" });
  }
}