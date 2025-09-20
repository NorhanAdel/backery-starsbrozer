import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";  

function MyOrders() {
  const { user } = useContext(AuthContext);  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/order/my",
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
        setOrders(data);
      } catch (err) {
        console.error("❌ خطأ أثناء جلب الطلبات:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) return <p>⏳ جاري تحميل الطلبات...</p>;

  return (
    <div className="my-orders">
      <h2>طلباتي</h2>
      {orders.length === 0 ? (
        <p>لا يوجد لديك طلبات بعد.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3>طلب رقم: {order._id}</h3>
            <p>
              <strong>التاريخ:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString("ar-EG")}
            </p>
            <p>
              <strong>الحالة:</strong> {order.orderStatus}
            </p>
            <p>
              <strong>طريقة الدفع:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong>إجمالي:</strong> {order.totalPrice} LE
            </p>

            {order.manualPayment && (
              <div>
                <p>
                  <strong>رقم التحويل:</strong>{" "}
                  {order.manualPayment.transactionId || "غير متوفر"}
                </p>
                {order.manualPayment.proofImage && (
                  <img
                    src={`http://localhost:5000/uploads/${order.manualPayment.proofImage}`}
                    alt="صورة التحويل"
                    width="150"
                  />
                )}
              </div>
            )}

            <h4>🛒 المنتجات:</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.product?.name} - {item.qty} × {item.price} LE
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
