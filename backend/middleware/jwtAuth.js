const JWT = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  const token = (req.cookies && req.cookies.token) || null;

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      success: false,
      message: "You are not authorized, please login.",
      data: null,
    });
  }

  JWT.verify(token, process.env.JWT_SECRET, function (error, payload) {
    if (error) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "You are not authorized, please login.",
        data: null,
      });
    } else {
      req.user = { id: payload.id, email: payload.email, role: payload.role };
    }
  });

  next();
};

module.exports = jwtAuth;
