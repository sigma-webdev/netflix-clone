const JWT = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  const token = (req.cookies && req.cookies.token) || null;

  if (!token) {
    return res.status(400).json({ success: false, message: "NOT authorized" });
  }

  JWT.verify(token, process.env.SECRETE, function (error, payload) {
    if (error) {
      return res.status(400).json({ success: false, message: err.message });
    } else {
      req.user = { id: payload.id, email: payload.email };
    }
  });

  next();
};

module.exports = jwtAuth;
