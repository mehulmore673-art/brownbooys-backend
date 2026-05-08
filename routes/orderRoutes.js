const router = require("express").Router();
const {
  placeOrder,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

/* ===============================
   📦 ORDER ROUTES
================================ */

// Customer
router.post("/", protect, placeOrder);

// Admin
router.get("/", protect, adminOnly, getOrders);
router.put("/:id", protect, adminOnly, updateOrderStatus);

module.exports = router;