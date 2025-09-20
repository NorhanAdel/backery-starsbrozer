import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Checkout.scss";
import { FaUpload } from "react-icons/fa"; 

const Checkout = () => {
  const { cartItems, totalPrice } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
    paymentMethod: "كاش عند الاستلام",
    transactionId: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      toast.warning("من فضلك أكمل جميع الحقول المطلوبة.");
      return;
    }

    if (
      (formData.paymentMethod === "فودافون كاش" ||
        formData.paymentMethod === "إنستا باي") &&
      (!formData.transactionId || !image)
    ) {
      toast.warning("برجاء إدخال رقم التحويل ورفع صورة التحويل.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

    
      const formattedItems = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      let res;

      if (formData.paymentMethod === "كاش عند الاستلام") {
        res = await axios.post(
          "http://localhost:5000/api/order",
          {
            customer: {
              name: formData.name,
              phone: formData.phone,
              address: formData.address,
              notes: formData.notes,
            },
            items: formattedItems,
            total: totalPrice,
            paymentMethod: formData.paymentMethod,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        const data = new FormData();
        data.append("customer[name]", formData.name);
        data.append("customer[phone]", formData.phone);
        data.append("customer[address]", formData.address);
        data.append("customer[notes]", formData.notes);
        data.append("paymentMethod", formData.paymentMethod);
        data.append("total", totalPrice);
        data.append("items", JSON.stringify(formattedItems));
        data.append("transactionId", formData.transactionId);
        data.append("image", image);

        res = await axios.post("http://localhost:5000/api/order", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      toast.success("✅ تم تسجيل طلبك بنجاح!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("❌ حصل خطأ أثناء إتمام الطلب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h2>إتمام الطلب</h2>

      {cartItems.length === 0 ? (
        <p className="empty">سلة التسوق فارغة 🛒</p>
      ) : (
        <div className="checkout-wrapper">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>بيانات العميل</h3>

            <label>الاسم الكامل *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>رقم الهاتف *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label>العنوان *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>

            <label>ملاحظات إضافية</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            ></textarea>

            <label>طريقة الدفع *</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="كاش عند الاستلام">كاش عند الاستلام</option>
              <option value="فودافون كاش">فودافون كاش</option>
              <option value="إنستا باي">إنستا باي</option>
            </select>

            {formData.paymentMethod !== "كاش عند الاستلام" && (
              <>
                <label>رقم التحويل :01123589596*</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  required
                />
                <label className="upload-box">
                  <FaUpload className="upload-icon" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "جارٍ المعالجة..." : "تأكيد الطلب"}
            </button>
          </form>

          <div className="order-summary">
            <h3>ملخص الطلب</h3>
            <ul>
              {cartItems.map((item) => (
                <li key={item._id} className="order-item">
                  <img
                    src={`http://localhost:5000/uploads/${item.product?.image}`}
                    alt={item.product?.name}
                    className="order-img"
                  />
                  <div className="order-info">
                    <span>
                      {item.product?.name} × {item.quantity}
                    </span>
                    <span>LE {item.product?.price * item.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
            <hr />
            <h4>الإجمالي: LE {totalPrice}</h4>
          </div>
        </div>
      )}

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Checkout;
