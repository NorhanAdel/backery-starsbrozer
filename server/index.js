const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./routes/auth");
const order = require("./routes/order");
require("dotenv").config();
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const payment = require("./routes/wallet");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);
app.use("/api/auth", auth);
app.use("/api/order", order);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", payment);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));
