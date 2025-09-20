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
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/order", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `http://localhost:5000/api/order/${id}`,
      { orderStatus: status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("هل أنت متأكد من حذف الطلب؟")) {
      await axios.delete(`http://localhost:5000/api/order/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
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
            <>
              <tr key={order._id}>
                <td>{order.user?.name || "غير متوفر"}</td>
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
                <td>{order.totalPrice} LE</td>
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

              {/* تفاصيل الطلب - Dropdown */}
              {expandedOrderId === order._id && (
                <tr className="order-details-row">
                  <td colSpan="6">
                    <div className="order-details">
                      <p>
                        <strong>العميل:</strong> {order.user?.name} (
                        {order.user?.email})
                      </p>
                      <p>
                        <strong>العنوان:</strong>{" "}
                        {`${order.shippingAddress?.address}, ${order.shippingAddress?.city}, ${order.shippingAddress?.country}`}
                      </p>
                      <p>
                        <strong>طريقة الدفع:</strong> {order.paymentMethod}
                      </p>
                      <p>
                        <strong>الإجمالي:</strong> {order.totalPrice} LE
                      </p>

                      <h4>🛒 المنتجات:</h4>
                      <ul>
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.product?.name || "منتج محذوف"} -{" "}
                            {item.quantity} × {item.price} LE
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
