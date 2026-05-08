const router = require("express").Router();
const {
  getMenu,
  addItem,
  deleteItem,
} = require("../controllers/menuController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

/* ===============================
   🍽️ MENU ROUTES
================================ */

// Public
router.get("/", getMenu);

// Admin only
router.post("/", protect, adminOnly, addItem);
router.delete("/:id", protect, adminOnly, deleteItem);

module.exports = router;