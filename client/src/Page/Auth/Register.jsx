import React, { useState } from "react";
import axios from "axios";
import "./Auth.scss";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "خطأ في التسجيل");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>إنشاء حساب</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="الاسم"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={formData.password}
            onChange={handleChange}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">تسجيل</button>
        </form>
        <p>
          لديك حساب؟ <a href="/login">سجل دخولك</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
