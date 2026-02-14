import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired",
        success: false,
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    return res.status(500).json({
      message: "Authentication error",
      success: false,
    });
  }
};

export default authenticateToken;