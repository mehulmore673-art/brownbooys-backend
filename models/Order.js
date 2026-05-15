const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],

    total: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    location: {
      lat: Number,
      lng: Number,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: ["Preparing", "Out for Delivery", "Delivered", "Cancelled"],
      default: "Preparing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);