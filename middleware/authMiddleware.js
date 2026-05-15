const jwt = require("jsonwebtoken");

/* ===============================
   🔐 AUTHENTICATION MIDDLEWARE
================================ */
exports.protect = (req, res, next) => {
  try {
    let token;

    // Check token in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Not authorized, no token",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = decoded;

    next();

  } catch (error) {
    console.error(error.message);
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token",
    });
  }
};

/* ===============================
   👑 ROLE-BASED ACCESS CONTROL
================================ */
exports.adminOnly = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        status: "fail",
        message: "Access denied (Admin only)",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Authorization error",
    });
  }
};