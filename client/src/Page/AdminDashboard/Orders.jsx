import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.scss";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/order", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("❌ خطأ في جلب الطلبات:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/order/${id}`,
        { orderStatus: status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders();
    } catch (err) {
      console.error("❌ خطأ في تحديث الحالة:", err);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (window.confirm("هل أنت متأكد من حذف الطلب؟")) {
        await axios.delete(`http://localhost:5000/api/order/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchOrders();
      }
    } catch (err) {
      console.error("❌ خطأ في حذف الطلب:", err);
    }
  };

  return (
    <div className="orders-management">
      <h2>📋 إدارة الطلبات</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>العميل</th>
            <th>الحالة</th>
            <th>طريقة الدفع</th>
            <th>الإجمالي</th>
            <th>تاريخ الطلب</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order._id}>
              <tr>
                <td>{order.customer || order.user?.name || "غير متوفر"}</td>
                <td>
                  <span
                    className={`status ${
                      order.orderStatus === "pending"
                        ? "pending"
                        : order.orderStatus === "delivering"
                        ? "delivering"
                        : "delivered"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td>{order.paymentMethod}</td>
                <td>{order.total || order.totalPrice} LE</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-delivering"
                    onClick={() => updateStatus(order._id, "delivering")}
                  >
                    جاري التسليم
                  </button>
                  <button
                    className="btn btn-delivered"
                    onClick={() => updateStatus(order._id, "delivered")}
                  >
                    تم التسليم
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteOrder(order._id)}
                  >
                    🗑️ حذف
                  </button>
                  <button
                    className="btn btn-details"
                    onClick={() =>
                      setExpandedOrderId(
                        expandedOrderId === order._id ? null : order._id
                      )
                    }
                  >
                    {expandedOrderId === order._id ? "▲ إخفاء" : "▼ تفاصيل"}
                  </button>
                </td>
              </tr>

              {expandedOrderId === order._id && (
                <tr className="order-details-row">
                  <td colSpan="6">
                    <div className="order-details">
                      <p>
                        <strong>العميل:</strong>{" "}
                        {order.customer || order.user?.name || "غير متوفر"} (
                        {order.user?.email || "لا يوجد إيميل"})
                      </p>
                      <p>
                        <strong>العنوان:</strong>{" "}
                        {order.shippingAddress?.address
                          ? `${order.shippingAddress.address}${
                              order.shippingAddress.city
                                ? `, ${order.shippingAddress.city}`
                                : ""
                            }${
                              order.shippingAddress.country
                                ? `, ${order.shippingAddress.country}`
                                : ""
                            }`
                          : "غير متوفر"}
                      </p>
                      <p>
                        <strong>طريقة الدفع:</strong> {order.paymentMethod}
                      </p>
                      <p>
                        <strong>الإجمالي:</strong>{" "}
                        {order.total || order.totalPrice} LE
                      </p>

                      {order.manualPayment.transactionId && (
                        <p>
                          <strong>رقم التحويل:</strong>{" "}
                          {order.manualPayment.transactionId}
                        </p>
                      )}

                      {order.manualPayment.proofImage && (
                        <div className="transfer-image">
                          <strong>صورة التحويل:</strong>
                          <br />
                          <img
                            src={`http://localhost:5000/uploads/${order.manualPayment.proofImage}`}
                            alt="صورة التحويل"
                            style={{
                              maxWidth: "200px",
                              marginTop: "10px",
                              borderRadius: "8px",
                            }}
                          />
                        </div>
                      )}

                      <h4>🛒 المنتجات:</h4>
                      <ul>
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.product?.name
                              ? `${item.product.name} - ${item.quantity} × ${item.price} LE`
                              : `منتج محذوف - ${item.quantity} × ${item.price} LE`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
