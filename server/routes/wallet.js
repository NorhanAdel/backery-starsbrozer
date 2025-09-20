const express = require("express");
const { checkout} = require("../controller/wallet");
const router = express.Router();
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware");
router.post("/", authMiddleware, checkout);
 
module.exports = router;
