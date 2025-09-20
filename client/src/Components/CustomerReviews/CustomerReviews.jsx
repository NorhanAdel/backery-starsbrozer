import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./CustomerReviews.scss";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const CustomerReviews = () => {
  const reviews = [
    {
      name: "محمود علي",
      rating: 5,
      comment: "أفضل مخبز جربته! طعم ممتاز وخدمة رائعة.",
    },
    {
      name: "منى سمير",
      rating: 4,
      comment: "الخبز طازج جدًا، لكن أتمنى توسعوا في الفروع.",
    },
    {
      name: "أحمد عادل",
      rating: 5,
      comment: "خدمة عملاء ممتازة والمنتجات كلها رائعة.",
    },
  ];

  return (
    <div className="customer-reviews">
      <div className="info-section">
        <h2>آراء عملائنا</h2>
        <div className="rating">
          <FaStar color="#FFD700" />
          <span>4.8</span>
        </div>
        <div className="location">
          <FaMapMarkerAlt />
          <span>
            القناطر الخيريه شارع سوق التلات امام ماركت حسن عبد الجواد / عزبه
            مسلم القناطر الخيريه بعد دار المناسبات
          </span>
        </div>
        <div className="time">
          <FaClock />
          <span>يومياً من 8 صباحًا لـ 11 مساءً</span>
        </div>
      </div>

      <div className="slider-section">
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation={true}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="review-box">
                <h4>{review.name}</h4>
                <div className="stars">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} color="#FFD700" />
                  ))}
                </div>
                <p>{review.comment}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CustomerReviews;
