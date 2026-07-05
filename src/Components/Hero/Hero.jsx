import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./Hero.module.scss";

import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";

const banners = [banner1, banner2, banner3];

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3200, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className={styles.heroSwiper}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner}>
            <img src={banner} alt={`MyKart offer ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
