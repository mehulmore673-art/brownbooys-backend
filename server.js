require("dotenv").config();
const paymentRoutes = require("./routes/payment");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.mongodb+srv://mehulmore673_db_user:More1988@cluster0.k86ou0d.mongodb.net/?appName=Cluster0)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("Mongo Error ❌", err));

const app = express();

const OrderSchema = new mongoose.Schema({
  id:        Number,
  items:     Array,
  total:     Number,
  orderType: String,
  status:    String,
  userId:    String,
  userName:  String,
  userPhone: String,
  paymentId:    String,
  adminDeleted: { type: Boolean, default: false },
  time:         String,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);

app.use(cors());
app.use(express.json());
app.use("/api/payment", paymentRoutes);

/* ============================
   DATA STORAGE
============================ */

let shop = {
  shopOpen:   true,
  deliveryOn: true
};

let menu = [
  {
    id: 1,
    title: { en: "Sp. Dry Masala Vadapav", hi: "ड्राई मसाला वडा पाव", gu: "ડ્રાય મસાલા વડા પાવ" },
    variants: [
      { name: { en: "Regular",      hi: "रेगुलर",    gu: "રેગ્યુલર"  }, price: 25 },
      { name: { en: "Butter",       hi: "बटर",       gu: "બટર"       }, price: 30 },
      { name: { en: "Mayo",         hi: "मेयो",      gu: "મેયો"      }, price: 35 },
      { name: { en: "Cheese",       hi: "चीज़",      gu: "ચીઝ"       }, price: 40 },
      { name: { en: "Butter Cheese",hi: "बटर चीज़",  gu: "બટર ચીઝ"  }, price: 45 }
    ]
  },
  {
    id: 2,
    title: { en: "Sp. Lasaniya Vadapav", hi: "लसणिया वडा पाव", gu: "લસણિયા વડા પાવ" },
    variants: [
      { name: { en: "Regular",      hi: "रेगुलर",    gu: "રેગ્યુલર"  }, price: 30 },
      { name: { en: "Butter",       hi: "बटर",       gu: "બટર"       }, price: 35 },
      { name: { en: "Mayo",         hi: "मेयो",      gu: "મેયો"      }, price: 40 },
      { name: { en: "Cheese",       hi: "चीज़",      gu: "ચીઝ"       }, price: 45 },
      { name: { en: "Butter Cheese",hi: "बटर चीज़",  gu: "બટર ચીઝ"  }, price: 50 }
    ]
  },
  {
    id: 3,
    title: { en: "B.B Signature Vadapav", hi: "बीबी सिग्नेचर वडा पाव", gu: "બીબી સિગ્નેચર વડા પાવ" },
    variants: [
      { name: { en: "Regular",      hi: "रेगुलर",    gu: "રેગ્યુલર"  }, price: 50 },
      { name: { en: "Butter",       hi: "बटर",       gu: "બટર"       }, price: 60 },
      { name: { en: "Mayo",         hi: "मेयो",      gu: "મેયો"      }, price: 70 },
      { name: { en: "Cheese",       hi: "चीज़",      gu: "ચીઝ"       }, price: 80 },
      { name: { en: "Butter Cheese",hi: "बटर चीज़",  gu: "બટર ચીઝ"  }, price: 90 }
    ]
  },
  { id: 4,  title: { en: "Allo Tikki Wrap",          hi: "आलू टिक्की रैप",        gu: "આલુ ટિક્કી રેપ"       }, price: 80  },
  { id: 5,  title: { en: "Veg Wrap",                 hi: "वेज रैप",               gu: "વેજ રેપ"               }, price: 90  },
  { id: 6,  title: { en: "Tangy Wrap",               hi: "टैंगी रैप",             gu: "ટેંગી રેપ"             }, price: 100 },
  { id: 7,  title: { en: "Basic Quesadilla",         hi: "बेसिक क्वेसाडिला",      gu: "બેસિક કેસાડિલા"        }, price: 90  },
  { id: 8,  title: { en: "Spicy Quesadilla",         hi: "स्पाइसी क्वेसाडिला",   gu: "સ્પાઇસી કેસાડિલા"      }, price: 110 },
  { id: 9,  title: { en: "Paneer Quesadilla",        hi: "पनीर क्वेसाडिला",       gu: "પનીર કેસાડિલા"         }, price: 130 },
  { id: 10, title: { en: "BB Special Quesadilla",    hi: "बीबी स्पेशल क्वेसाडिला",gu: "બીબી સ્પેશિયલ કેસાડિલા"}, price: 140 },
  { id: 11, title: { en: "Classic Salt Fries",       hi: "क्लासिक फ्राइज",        gu: "ક્લાસિક ફ્રાઈઝ"        }, price: 49  },
  { id: 12, title: { en: "Peri Peri Fries",          hi: "पेरी पेरी फ्राइज",      gu: "પેરી પેરી ફ્રાઈઝ"      }, price: 69  },
  {
    id: 13,
    title: { en: "Dabeli", hi: "दाबेली", gu: "દાબેલી" },
    variants: [
      { name: { en: "Regular",      hi: "रेगुलर",    gu: "રેગ્યુલર"  }, price: 25 },
      { name: { en: "Butter",       hi: "बटर",       gu: "બટર"       }, price: 30 },
      { name: { en: "Mayo",         hi: "मेयो",      gu: "મેયો"      }, price: 35 },
      { name: { en: "Cheese",       hi: "चीज़",      gu: "ચીઝ"       }, price: 40 },
      { name: { en: "Butter Cheese",hi: "बटर चीज़",  gu: "બટર ચીઝ"  }, price: 45 }
    ]
  },
  {
    id: 14,
    title: { en: "House Full Katka Dabeli", hi: "हाउसफुल दाबेली", gu: "હાઉસફુલ દાબેલી" },
    variants: [
      { name: { en: "Regular",      hi: "रेगुलर",    gu: "રેગ્યુલર"  }, price: 50 },
      { name: { en: "Butter",       hi: "बटर",       gu: "બટર"       }, price: 60 },
      { name: { en: "Mayo",         hi: "मेयो",      gu: "મેયો"      }, price: 70 },
      { name: { en: "Cheese",       hi: "चीज़",      gu: "ચીઝ"       }, price: 80 },
      { name: { en: "Butter Cheese",hi: "बटर चीज़",  gu: "બટર ચીઝ"  }, price: 90 }
    ]
  },
  { id: 15, title: { en: "Peri Peri Burger",    hi: "पेरी पेरी बर्गर",   gu: "પેરી પેરી બર્ગર"  }, price: 49 },
  { id: 16, title: { en: "Schezwan Burger",     hi: "सेजवान बर्गर",      gu: "સેજવાન બર્ગર"     }, price: 49 },
  { id: 17, title: { en: "Chilli Garlic Burger",hi: "चिली गार्लिक बर्गर",gu: "ચિલી ગાર્લિક બર્ગર"}, price: 49 },
  { id: 18, title: { en: "Tandoori Burger",     hi: "तंदूरी बर्गर",      gu: "તંદૂરી બર્ગર"     }, price: 49 },
  { id: 19, title: { en: "Cheese Lover Burger", hi: "चीज़ लवर बर्गर",    gu: "ચીઝ લવર બર્ગર"    }, price: 69 }
];

let notice = { text: "" };

/* ============================
   HELPERS
============================ */

/**
 * Validate an incoming order payload.
 * Returns { valid: true } or { valid: false, code, message }.
 */
function validateOrder(order) {
  // ── structural checks ──
  if (!order || typeof order !== "object") {
    return { valid: false, code: 400, message: "Invalid order payload." };
  }
  if (!Array.isArray(order.items) || order.items.length === 0) {
    return { valid: false, code: 400, message: "Order must contain at least one item." };
  }
  if (typeof order.total !== "number" || order.total <= 0) {
    return { valid: false, code: 400, message: "Order total is invalid." };
  }
  if (!["pickup", "dinein", "delivery"].includes(order.orderType)) {
    return { valid: false, code: 400, message: "Invalid order type." };
  }
  if (!order.userId) {
    return { valid: false, code: 400, message: "Missing userId." };
  }

  // ── business-rule checks ──
  if (!shop.shopOpen) {
    return { valid: false, code: 400, message: "Shop is currently closed." };
  }
  if (order.orderType === "delivery" && !shop.deliveryOn) {
    return { valid: false, code: 400, message: "Delivery is currently unavailable." };
  }
  if (order.orderType === "delivery" && order.total < 400) {
    return { valid: false, code: 400, message: "Minimum order of ₹400 required for delivery." };
  }

  return { valid: true };
}

/* ============================
   MENU API
============================ */

app.get("/api/menu", (req, res) => {
  res.json(menu);
});

app.post("/api/menu", (req, res) => {
  const item = req.body;
  if (!item || !item.id || !item.title) {
    return res.status(400).json({ error: "Invalid menu item." });
  }
  menu.push(item);
  res.json({ success: true });
});

app.put("/api/menu/:id", (req, res) => {
  const { id } = req.params;
  menu = menu.map(i => i.id === Number(id) ? { ...i, ...req.body } : i);
  res.json({ success: true });
});

app.delete("/api/menu/:id", (req, res) => {
  const { id } = req.params;
  menu = menu.filter(i => i.id !== Number(id));
  res.json({ success: true });
});

/* ============================
   ORDERS API
============================ */

app.get("/api/orders", async (req, res) => {
  try {
    // admin=true query param → exclude soft-deleted orders
    // customer (no param)   → include all orders so past orders stay visible
    const isAdmin = req.query.admin === "true";
    const filter  = isAdmin ? { adminDeleted: { $ne: true } } : {};
    const data    = await Order.find(filter);
    res.json(data);
  } catch (err) {
    console.error("GET /api/orders error:", err);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});

app.post("/api/orders", async (req, res) => {
  const order = req.body;

  // ── validate ──
  const check = validateOrder(order);
  if (!check.valid) {
    console.warn("Order rejected:", check.message);
    return res.status(check.code).json({ error: check.message });
  }

  // ── persist ──
  try {
    order.status    = "Pending";
    order.createdAt = Date.now();
    await Order.create(order);
    res.json({ success: true });
  } catch (err) {
    console.error("POST /api/orders DB error:", err);
    res.status(500).json({ error: "Failed to save order. Please try again." });
  }
});

/* UPDATE ORDER STATUS */
app.put("/api/orders/:id", async (req, res) => {
  const { id }     = req.params;
  const { status } = req.body;

  const allowed = ["Pending", "Preparing", "Ready", "Completed", "Cancelled", "Paid"];
  if (status && !allowed.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${allowed.join(", ")}` });
  }

  try {
    // Try numeric id, then string id, then MongoDB _id
    let result = await Order.findOneAndUpdate(
      { id: Number(id) },
      { $set: { status: status || "Completed" } },
      { new: true }
    );

    if (!result) {
      result = await Order.findOneAndUpdate(
        { id: id },
        { $set: { status: status || "Completed" } },
        { new: true }
      );
    }

    if (!result) {
      const mongoose = require("mongoose");
      if (mongoose.Types.ObjectId.isValid(id)) {
        result = await Order.findByIdAndUpdate(
          id,
          { $set: { status: status || "Completed" } },
          { new: true }
        );
      }
    }

    if (!result) {
      console.warn("PUT: order not found for id =", id);
      return res.status(404).json({ error: "Order not found." });
    }

    console.log("Updated Order:", result);
    res.json({ success: true, order: result });
  } catch (err) {
    console.error("PUT /api/orders/:id DB error:", err);
    res.status(500).json({ error: "Failed to update order status." });
  }
});

/* SOFT-DELETE ORDER (admin only — sets adminDeleted:true, keeps for customer) */
app.delete("/api/orders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Try matching custom numeric id first, then string id, then MongoDB _id
    let result = await Order.findOneAndUpdate(
      { id: Number(id) },
      { $set: { adminDeleted: true } },
      { new: true }
    );

    // Fallback: some old orders stored id as a string
    if (!result) {
      result = await Order.findOneAndUpdate(
        { id: id },
        { $set: { adminDeleted: true } },
        { new: true }
      );
    }

    // Last fallback: match MongoDB _id directly
    if (!result) {
      const mongoose = require("mongoose");
      if (mongoose.Types.ObjectId.isValid(id)) {
        result = await Order.findByIdAndUpdate(
          id,
          { $set: { adminDeleted: true } },
          { new: true }
        );
      }
    }

    if (!result) {
      console.warn("DELETE: order not found for id =", id);
      return res.status(404).json({ error: "Order not found." });
    }

    console.log("Soft-deleted order:", result.id || id);
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/orders/:id error:", err);
    res.status(500).json({ error: "Failed to delete order." });
  }
});

/* ============================
   SHOP API
============================ */

app.get("/api/shop", (req, res) => {
  res.json(shop);
});

app.put("/api/shop", (req, res) => {
  const { shopOpen, deliveryOn } = req.body;
  if (typeof shopOpen !== "boolean" || typeof deliveryOn !== "boolean") {
    return res.status(400).json({ error: "shopOpen and deliveryOn must be booleans." });
  }
  shop = { shopOpen, deliveryOn };
  res.json({ success: true });
});

/* ============================
   NOTICE API
============================ */

app.get("/api/notice", (req, res) => {
  res.json(notice);
});

app.post("/api/notice", (req, res) => {
  notice = req.body;
  res.json({ success: true });
});

/* ============================
   GLOBAL ERROR HANDLER
============================ */

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "An unexpected server error occurred." });
});
app.get("/api/debug/orders", async (req, res) => {
  const data = await Order.find().limit(5);
  res.json(data.map(o => ({ _id: o._id, id: o.id, idType: typeof o.id })));
});

/* ============================
   SERVER
============================ */

app.listen(5000, () => {
  console.log("Server running on port 5000 ✅");
});