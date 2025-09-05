import React, { useState, useEffect } from "react";
import HeroSlide from "./HeroSlide";
import styles from "./Hero.module.scss";

import plane from '../../assets/plane.png';
import sofa from '../../assets/sofa.png';
import mobile from '../../assets/mobiles.png';
import saleBg from '../../assets/sale-bg.png';
import summerBg from '../../assets/summer-bg.png';
import techBg from '../../assets/tech-bg.png';

const slidesData = [
  {
    id: 1,
    title: 'AirAsia',
    subtitle: 'Up to 30% Off',
    description: 'Flash sale for 48Hr',
    code: 'FLYAIRASIA',
    img: plane,
    bg: saleBg,
  },
  {
    id: 2,
    title: 'Furniture Fiesta',
    subtitle: 'Flat 40% Off',
    description: 'Modern & Classic Collections',
    code: 'SOFA40',
    img: sofa,
    bg: summerBg,
  },
  {
    id: 3,
    title: 'Smartphone Days',
    subtitle: 'Up to ₹15,000 Off',
    description: 'Top brands on discount',
    code: 'MOBILE15K',
    img: mobile,
    bg: techBg,
  },
  {
    id: 4,
    title: 'Monsoon Bonanza',
    subtitle: 'Grab Coupons & Offers',
    description: 'Save big on every order',
    code: 'RAINYSALE',
    img: plane,
    bg: summerBg,
  },
  {
    id: 5,
    title: 'Laptop Fest',
    subtitle: 'Up to 50% Off',
    description: 'Gaming & Business Laptops',
    code: 'LAPTOPFEST',
    img: mobile,
    bg: techBg,
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.heroCarousel}>
      {slidesData.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === current ? styles.active : ""
          }`}
          style={{ backgroundImage: `url(${slide.bg})` }}
        >
          <HeroSlide {...slide} />
        </div>
      ))}
    </div>
  );
};

export default Hero;
