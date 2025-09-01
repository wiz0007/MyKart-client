import React from "react";
import styles from "./CategoryCard.module.scss";
import CategoryItem from "./CategoryItem";
import mobileImg from '../../assets/mobile.png'
import applianceImg from '../../assets/appliances.png'
import fashionImg from '../../assets/fashion.png'
import beautyImg from '../../assets/beauty.png'


const CategoryCard = () => {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.contents}>
        <CategoryItem name="Mobiles and Tablets" image={mobileImg} link="" /> 
        <CategoryItem name="Home Appliances" image={applianceImg} link="" /> 
        <CategoryItem name="Fashion" image={fashionImg} link="" /> 
        <CategoryItem name="Beauty" image={beautyImg} link="" /> 
      </div>
    </div>
  );
};

export default CategoryCard;
