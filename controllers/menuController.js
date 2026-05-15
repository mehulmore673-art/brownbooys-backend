const Menu = require("../models/Menu");

/* ===============================
   📋 GET ALL MENU ITEMS
================================ */
exports.getMenu = async (req, res) => {
  try {
    const items = await Menu.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: items.length,
      data: items,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch menu" });
  }
};

/* ===============================
   ➕ ADD MENU ITEM
================================ */
exports.addItem = async (req, res) => {
  try {
    const { name, price, image, category, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name & price required" });
    }

    const item = await Menu.create({
      name,
      price,
      image,
      category,
      description,
    });

    res.status(201).json({
      status: "success",
      message: "Item added",
      data: item,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to add item" });
  }
};

/* ===============================
   🗑️ DELETE MENU ITEM
================================ */
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    await Menu.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Item deleted",
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Delete failed" });
  }
};