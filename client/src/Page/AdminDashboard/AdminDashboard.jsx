import React, { useState } from "react";
import ProductsList from "./ProductsList";
import AddProduct from "./AddProduct";
import Orders from "./Orders";
import "./AdminDashboard.scss";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductsList />;
      case "add":
        return <AddProduct />;
      case "orders":
        return <Orders />;
      default:
        return <ProductsList />;
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>لوحة التحكم</h2>
        <ul>
          <li onClick={() => setActiveTab("products")}>📦 المنتجات</li>
          <li onClick={() => setActiveTab("add")}>➕ إضافة منتج</li>
          <li onClick={() => setActiveTab("orders")}>📑 الطلبات</li>
          <li onClick={() => alert("تم تسجيل الخروج")}>🚪 تسجيل الخروج</li>
        </ul>
      </aside>

      <main className="content">{renderContent()}</main>
    </div>
  );
}

export default AdminDashboard;
