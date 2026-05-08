const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
      enum: ["Starter", "Main", "Dessert", "Beverage"],
    },

    description: {
      type: String,
      default: "",
    },

    isVeg: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 4,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);