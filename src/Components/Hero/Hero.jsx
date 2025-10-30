import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./Hero.module.scss";

// Importing local assets
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";

import offer1 from "../../assets/deal1.png";
import offer2 from "../../assets/deal1.png";
import offer3 from "../../assets/deal1.png";

const banners = [banner1, banner2, banner3];
const offers = [
  { img: offer1, text: "Top Deals on Mobiles" },
  { img: offer2, text: "Fashion at 50% Off" },
  { img: offer3, text: "Electronics Bonanza" },
];

const HeroSection = () => {
  return (
    <section className={styles.heroContainer}>
      {/* Main Banner Carousel */}
      <motion.div
        className={styles.bannerContainer}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Swiper
          spaceBetween={30}
          centeredSlides
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          modules={[Autoplay, Pagination, Navigation]}
          className={styles.heroSwiper}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <img src={banner} alt={`Banner ${index + 1}`} className={styles.mainBanner} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Animated Offer Cards */}
      <motion.div
        className={styles.sideOffers}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {offers.map((offer, index) => (
          <motion.div
            key={index}
            className={styles.offerCard}
            whileHover={{ scale: 1.05, boxShadow: "0 6px 16px rgba(0,0,0,0.2)" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <img src={offer.img} alt={offer.text} className={styles.offerImage} />
            <p className={styles.offerText}>{offer.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;
