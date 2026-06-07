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
    const {
      en,
      hi,
      gu,
      description,
      price,
      variants,
      isNew,
      isBestseller,
      isHot,
      isVeg,
      rating,
      prepTime,
    } = req.body;

    if (!en || (!price && !variants)) {
      return res.status(400).json({
        error: "Invalid item",
      });
    }

    const image = req.file ? req.file.path : "";

    const lastItem = await Menu.findOne().sort({ id: -1 });

    const item = await Menu.create({
      id: lastItem ? lastItem.id + 1 : 1,

      title: {
        en,
        hi,
        gu,
      },

      description,
      image,
      price: price || null,

      variants: variants ? JSON.parse(variants) : [],

      isNew: isNew === "true",
      isBestseller: isBestseller === "true",
      isHot: isHot === "true",
      isVeg: isVeg !== "false",

      rating,
      prepTime,
    });

    res.status(201).json({
      success: true,
      item,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to add item",
    });
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