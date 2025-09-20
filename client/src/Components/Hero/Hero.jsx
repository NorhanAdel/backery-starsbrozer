import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Hero.scss";
import { slides } from "../../Constant/hero";

const Hero = () => {
  return (
    <section className="hero">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="overlay">
                <h2>{slide.title}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
