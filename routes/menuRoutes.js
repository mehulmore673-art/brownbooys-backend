const router = require("express").Router();
const adminAuth = require("../middleware/admin");
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
router.post("/", adminAuth, addItem);
router.delete("/:id", adminAuth, deleteItem);
module.exports = router;