import React, { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";  

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      if (image) {
        formData.append("image", image);
      }

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ تم إضافة المنتج بنجاح");
      setForm({ name: "", description: "", price: "", category: "" });
      setImage(null);
    } catch (error) {
      console.error("❌ خطأ أثناء إضافة المنتج:", error);
      alert("حدث خطأ أثناء إضافة المنتج");
    }
  };

  return (
    <div className="add-product">
      <h2>➕ إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="اسم المنتج"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="الوصف"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="السعر"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="الفئة"
          value={form.category}
          onChange={handleChange}
          required
        />

       
        <label className="upload-box">
          <FaUpload className="upload-icon" />
          <span>{image ? image.name : "اختر صورة المنتج"}</span>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            hidden
            required
          />
        </label>

        <button type="submit">إضافة</button>
      </form>
    </div>
  );
}
