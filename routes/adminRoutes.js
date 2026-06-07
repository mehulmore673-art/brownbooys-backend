const router = require("express").Router();

router.post("/login", (req, res) => {
  const { password } = req.body;

  if (password === "brownbooysadmin") {
    return res.json({
      success: true,
      token: password,
    });
  }

  return res.status(401).json({
    error: "Wrong admin password",
  });
});

module.exports = router;