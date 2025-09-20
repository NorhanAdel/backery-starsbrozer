const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
   longTitle: String,
  price: { type: Number, required: true },
  image: { type: String },
  category: { type: String, required: true },
  salesCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", productSchema);
