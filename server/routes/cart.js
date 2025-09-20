const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateQuantity,
} = require("../controller/cart");

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/remove/:productId", authMiddleware, removeFromCart);
router.put("/update/:productId", authMiddleware, updateQuantity);
router.delete("/clear", authMiddleware, clearCart);

module.exports = router;
