const Order = require("../models/Order");

/* ===============================
   📦 PLACE ORDER
================================ */
exports.placeOrder = async (req, res) => {
  try {
    const { items, total, address, location, userId } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = await Order.create({
      userId,
      items,
      total,
      address,
      location,
      paymentStatus: "Pending",
      orderStatus: "Preparing",
    });

    res.status(201).json({
      status: "success",
      message: "Order placed",
      data: order,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Order failed" });
  }
};

/* ===============================
   📋 GET ALL ORDERS (ADMIN)
================================ */
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: orders.length,
      data: orders,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/* ===============================
   🔄 UPDATE ORDER STATUS
================================ */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "Order updated",
      data: order,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Update failed" });
  }
};