const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  bestSelling,
  searchProducts,
  categories,
  category,
} = require("../controller/product");
const upload = require("../middleware/upload");
router.post("/", upload.single("image"), createProduct);
router.get("/", getAllProducts);
router.get("/bestSelling", bestSelling);
router.get("/search", searchProducts);

router.get("/categories", categories);
router.get("/categories/:category", category);

router.get("/:id", getProductById);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;
