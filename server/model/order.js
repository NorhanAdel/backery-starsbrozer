const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String },  
      postalCode: { type: String },
      country: { type: String, default: "Egypt" },
      phone: { type: String },
      name: { type: String },
    },
    paymentMethod: {
      type: String,
      enum: ["كاش عند الاستلام", "فودافون كاش", "إنستا باي"],
      default: "كاش عند الاستلام",
    },
    totalPrice: { type: Number, required: true },
    orderStatus: {
      type: String,
      enum: ["pending", "delivering", "delivered"],
      default: "pending",
    },
    paymobOrderId: { type: Number },
    transactionId: { type: String },
    paymentDetails: { type: Object },
    manualPayment: {
      transactionId: { type: String },
      proofImage: { type: String },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
    },
    paymentStatus: { type: String, default: "غير مدفوع" },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
