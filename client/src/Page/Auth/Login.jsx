import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import "./Auth.scss";

function Login() {
  const { loginUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      loginUser(res.data);  
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "خطأ في تسجيل الدخول");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>تسجيل الدخول</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">دخول</button>
          <p>
            لديك حساب؟ <a href="/register">سجل دخولك</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

