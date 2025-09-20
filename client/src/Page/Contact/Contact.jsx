import React, { useState } from "react";
import "./Contact.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    toast.success("✅ تم إرسال رسالتك بنجاح، سنتواصل معك قريبًا");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h2>📞 تواصل معنا</h2>
      <p className="subtitle">يسعدنا تواصلك معنا في أي وقت</p>

      <div className="contact-container">
        <div className="contact-info">
          <h3>معلومات التواصل</h3>
          <p>📍 العنوان: القناطر الخيرية القليوبية أمام سوبر حسن عبد الجواد</p>
          <p>📧 البريد الإلكتروني: bronzerstars111@gmail.com</p>
          <p>📱 الهاتف: 01123589596</p>

          <div className="social-icons">
            <a
              href="https://www.facebook.com/share/19K5R2kUg8/?mibextid=qi2Omg"
              target="_blank"
              rel="noreferrer"
            >
              🌐 Facebook
            </a>
            <a
              href="https://www.instagram.com/bronzestars.eg?igsh=MWwwdjIxNDFrYTZqcA=="
              target="_blank"
              rel="noreferrer"
            >
              📸 Instagram
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>راسلنا الآن</h3>
          <input
            type="text"
            name="name"
            placeholder="الاسم الكامل"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="اكتب رسالتك هنا..."
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">إرسال</button>
        </form>
      </div>

      <div className="map-section">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1578.2519048452818!2d31.13385172883606!3d30.198358499288716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDExJzU0LjQiTiAzMcKwMDgnMDEuOCJF!5e1!3m2!1sen!2seg!4v1757849587233!5m2!1sen!2seg"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;
