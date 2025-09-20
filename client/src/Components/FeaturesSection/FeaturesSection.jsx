import React from "react";
import driver from "../../Assets/delivery-man-svgrepo-com.svg";
import bread from "../../Assets/bread-svgrepo-com.svg";
import quality from "../../Assets/quality-medal-svgrepo-com.svg";
import security from "../../Assets/security-shield-svgrepo-com.svg";

import "./FeaturesSection.scss";

const features = [
  {
    icon: bread,
    title: "مخبوزات طازة كل يوم",
    desc: "نجهز منتجاتنا يومياً لضمان أفضل طعم ونكهة.",
  },
  {
    icon: quality,
    title: "جودة مضمونة بكل لقمة",
    desc: "مكونات مختارة بعناية من أفضل الموردين.",
  },
  {
    icon: security,
    title: "طعم بيحكي حكاية",
    desc: "نكهات أصيلة تعكس خبرتنا في المخبوزات.",
  },
  {
    icon: driver,
    title: "من الفرن لبيتك على طول",
    desc: "خدمة توصيل سريعة للحفاظ على الطزاجة.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <img src={feature.icon} className="icon" />
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
