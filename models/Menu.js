const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    id: Number,

    title: {
      en: String,
      hi: String,
      gu: String,
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    price: Number,

    variants: Array,

    isNew: {
      type: Boolean,
      default: false,
    },

    isBestseller: {
      type: Boolean,
      default: false,
    },

    isHot: {
      type: Boolean,
      default: false,
    },

    isVeg: {
      type: Boolean,
      default: true,
    },

    rating: {
      type: Number,
      default: 4,
    },

    prepTime: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);