import React from "react";
import styles from "./Hero.module.scss";

const HeroSlide = ({ bg, img, title, subtitle,  }) => {
  return (
    <div className={styles.heroSlide} style={{ backgroundImage: `url(${bg})` }}>
      <div className={styles.heroContent}>
        <img src={img} alt="main" />
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroSlide;
