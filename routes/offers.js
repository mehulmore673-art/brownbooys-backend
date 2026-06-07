"use strict";
const express                       = require("express");
const router                        = express.Router();
const { Offer }                     = require("../models");
const { cloudinary, uploadOfferImage } = require("../config/cloudinary");
const adminAuth = require("../middleware/admin");
/* GET /api/offers — public, active banners */
router.get("/", async (req, res) => {
  try {
    const offers = await Offer.find({ active: true }).sort({ sortOrder: 1, createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch offers." });
  }
});

/* GET /api/offers/all — admin, every banner */
router.get("/all", adminAuth, async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch offers." });
  }
});

/* POST /api/offers — admin, upload new banner */
router.post("/", adminAuth, uploadOfferImage.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image file provided." });

    const offer = await Offer.create({
      imageUrl:  req.file.path,
      publicId:  req.file.filename,
      title:     req.body.title    || "",
      subtitle:  req.body.subtitle || "",
      ctaText:   req.body.ctaText  || "Order Now",
      active:    true,
      sortOrder: Number(req.body.sortOrder) || 0,
    });

    res.status(201).json({ success: true, offer });
  } catch (err) {
    console.error("POST /api/offers:", err.message);
    res.status(500).json({ error: "Failed to upload banner." });
  }
});

/* PUT /api/offers/:id — admin, update text / toggle active */
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const { title, subtitle, ctaText, active, sortOrder } = req.body;
    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      { $set: { title, subtitle, ctaText, active, sortOrder } },
      { new: true }
    );
    if (!offer) return res.status(404).json({ error: "Offer not found." });
    res.json({ success: true, offer });
  } catch (err) {
    res.status(500).json({ error: "Failed to update offer." });
  }
});

/* DELETE /api/offers/:id — admin, remove banner + Cloudinary asset */
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ error: "Offer not found." });
    if (offer.publicId) await cloudinary.uploader.destroy(offer.publicId).catch(() => {});
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/offers:", err.message);
    res.status(500).json({ error: "Failed to delete banner." });
  }
});

module.exports = router;
