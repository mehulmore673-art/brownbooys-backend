module.exports = function (req, res, next) {
  const adminPassword = req.headers["x-admin-password"];

  if (!adminPassword) {
    return res.status(401).json({
      error: "No admin password provided",
    });
  }

  if (adminPassword !== "brownbooysadmin") {
    return res.status(403).json({
      error: "Invalid admin password",
    });
  }

  next();
};