const axios = require("axios");
const Order = require("../model/order");

const PAYMOB_API_KEY = process.env.PAYMOB_API_KEY;
const INTEGRATION_ID_WALLET = process.env.INTEGRATION_ID_WALLET;

exports.checkout = async (req, res) => {
  try {
    const { customer, items, total, paymentMethod } = req.body;

    const newOrder = await Order.create({
      user: req.user?.id || null,
      items: items.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
        price: i.product.price,
      })),
      shippingAddress: {
        address: customer.address,
        city: "Cairo",
        country: "Egypt",
        phone: customer.phone,
      },
      paymentMethod,
      totalPrice: total,
      orderStatus: "pending",
    });

    if (paymentMethod === "كاش عند الاستلام") {
      return res.status(201).json({
        message: "✅ الطلب اتسجل بنجاح (كاش عند الاستلام)",
        order: newOrder,
      });
    }

    if (paymentMethod === "فودافون كاش") {
      newOrder.orderStatus = "قيد التحويل";
      await newOrder.save();

      return res.status(201).json({
        message: "📲 برجاء تحويل المبلغ على الرقم 010XXXXXXXX",
        note: "بعد التحويل هنتواصل معاك لتأكيد الطلب ✅",
        order: newOrder,
      });
    }

    if (paymentMethod === "إنستا باي") {
      newOrder.orderStatus = "قيد التحويل";
      await newOrder.save();

      return res.status(201).json({
        message: "🏦 برجاء تحويل المبلغ على حساب إنستا باي yourEmail@instapay",
        order: newOrder,
      });
    }

    const authRes = await axios.post(
      "https://accept.paymob.com/api/auth/tokens",
      { api_key: PAYMOB_API_KEY }
    );
    const token = authRes.data.token;

    const orderRes = await axios.post(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        auth_token: token,
        delivery_needed: false,
        amount_cents: total * 100,
        currency: "EGP",
        items: items.map((i) => ({
          name: i.product.name,
          amount_cents: i.product.price * 100,
          quantity: i.quantity,
        })),
      }
    );

    const paymobOrderId = orderRes.data.id;
    newOrder.paymobOrderId = paymobOrderId;
    await newOrder.save();

    const paymentKeyRes = await axios.post(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        auth_token: token,
        amount_cents: total * 100,
        currency: "EGP",
        order_id: paymobOrderId,
        billing_data: {
          first_name: customer.name,
          last_name: "User",
          email: "test@test.com",
          phone_number: customer.phone.replace(/\D/g, ""),
          street: "Test Street",
          building: "123",
          floor: "1",
          apartment: "1",
          city: "Cairo",
          state: "NA",
          country: "EG",
        },
        integration_id: INTEGRATION_ID_WALLET,
      }
    );

    const paymentKey = paymentKeyRes.data.token;

    const paymentRes = await axios.post(
      "https://accept.paymob.com/api/acceptance/payments/pay",
      {
        source: {
          identifier: customer.phone.replace(/\D/g, ""),
          subtype: "WALLET",
        },
        payment_token: paymentKey,
      }
    );

    const redirectUrl =
      paymentRes.data.redirect_url || paymentRes.data.iframe_redirection_url;

    return res.status(200).json({
      message: "✅ تم إنشاء الطلب والدفع",
      redirect_url: redirectUrl,
      order: newOrder,
    });
  } catch (err) {
    console.error("Payment Error:", err.response?.data || err.message);
    res.status(500).json({
      error: "Payment failed",
      details: err.response?.data || err.message,
    });
  }
};
