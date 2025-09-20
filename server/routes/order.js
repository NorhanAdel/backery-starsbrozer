const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getOrderById,
  getMyOrders,
  deleteOrder,
} = require("../controller/order");
const { authMiddleware } = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

router.post("/", authMiddleware, upload.single("image"), createOrder);
router.get("/:id", authMiddleware, getOrderById);
router.get("/", authMiddleware, getOrders);
router.get("/my", authMiddleware, getMyOrders);
router.put("/:id", authMiddleware, updateOrderStatus);
router.delete("/:id", authMiddleware, deleteOrder);

module.exports = router;
