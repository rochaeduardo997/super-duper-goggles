const jwt = require("jsonwebtoken");
const secret = "thisisasecretok";

module.exports = (req, res, next) => {
  const authToken = req.headers['authorization'];

  if(authToken != undefined){
    const bearer = authToken.split(' ');
    var token = bearer[1];

    const decoded = jwt.verify(token, secret);

    if(decoded.role == 1){
      return next();
    }else{
      return res.status(400).json({
        error: "You don\'t have authentication for this"
      });
    }

  }else{
    return res.status(400).json({
      error: "Failed on authentication"
    });
  }
}
