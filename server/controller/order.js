const Order = require("../model/order");

exports.createOrder = async (req, res) => {
  try {
    const { customer, items, total, paymentMethod, transactionId } = req.body;

    if (!customer || !items || !total || !paymentMethod) {
      return res
        .status(400)
        .json({ error: "من فضلك أكمل جميع الحقول المطلوبة" });
    }

    let parsedItems;
    try {
      parsedItems = typeof items === "string" ? JSON.parse(items) : items;
    } catch {
      return res.status(400).json({ error: "صيغة الـ items غير صحيحة" });
    }

    let paymentStatus = "غير مدفوع";
    let manualPayment = {};

    if (paymentMethod === "فودافون كاش" || paymentMethod === "إنستا باي") {
      if (!transactionId) {
        return res.status(400).json({ error: "برجاء إدخال رقم التحويل" });
      }
      paymentStatus = "قيد التحويل";
      manualPayment = {
        transactionId,
        proofImage: req.file ? req.file.filename : null,
        status: "pending",
      };
    }

    const order = new Order({
      user: req.user.id,
      items: parsedItems,
      shippingAddress: {
        address: customer.address,
        phone: customer.phone,
        name: customer.name,
      },
      paymentMethod,
      totalPrice: total,
      orderStatus: "pending",
      paymentStatus,
      notes: customer.notes || "",
      manualPayment,
    });

    await order.save();
    res.status(201).json({ message: "✅ تم تسجيل الطلب بنجاح", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ حصل خطأ في تسجيل الطلب" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch {
    res.status(500).json({ error: "حدث خطأ أثناء جلب الطلبات" });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "❌ خطأ أثناء جلب الطلبات" });
  }
};


exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name price image");
    if (!order) return res.status(404).json({ message: "الطلب غير موجود" });
    res.status(200).json(order);
  } catch {
    res.status(500).json({ error: "حدث خطأ أثناء جلب تفاصيل الطلب" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "الطلب غير موجود" });
    const { orderStatus, paymentStatus, manualPaymentStatus } = req.body;
    if (orderStatus) order.orderStatus = orderStatus.trim();
    if (paymentStatus) order.paymentStatus = paymentStatus.trim();
    if (manualPaymentStatus)
      order.manualPayment.status = manualPaymentStatus.trim();
    await order.save();
    res.json({ message: "✅ تم تحديث حالة الطلب", order });
  } catch (err) {
    res
      .status(500)
      .json({ message: "❌ خطأ أثناء التحديث", error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "الطلب غير موجود" });
    res.json({ message: "تم حذف الطلب" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
