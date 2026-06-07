const router = require("express").Router();
const {
  placeOrder,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const adminAuth = require("../middleware/admin");
const { protect } = require("../middleware/authMiddleware");

/* ===============================
   📦 ORDER ROUTES
================================ */

// Customer
router.post("/", protect, placeOrder);

// Admin
router.get("/", adminAuth, getOrders);
router.put("/:id", adminAuth, updateOrderStatus);

module.exports = router;