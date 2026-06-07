"use strict";

function toRad(deg) { return deg * (Math.PI / 180); }

/**
 * Haversine great-circle distance in km.
 */
function haversineKm(lat1, lon1, lat2, lon2) {
  const R    = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Delivery charge from shop config.
 * First `baseKm` km are free; ₹ratePerKm per km after that.
 */
function calcDeliveryCharge(distanceKm, shop = {}) {
  const base = shop.deliveryBaseKm    ?? 5;
  const rate = shop.deliveryRatePerKm ?? 5;
  if (distanceKm <= base) return 0;
  return Math.ceil((distanceKm - base) * rate);
}

module.exports = { haversineKm, calcDeliveryCharge };
