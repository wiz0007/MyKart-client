import React from "react";
import styles from "./CategoryCard.module.scss";
import CategoryItem from "./CategoryItem";
import mobileImg from "../../assets/mobile.png";
import applianceImg from "../../assets/appliances.png";
import fashionImg from "../../assets/fashion.png";
import beautyImg from "../../assets/beauty.png";

const categories = [
  { name: "Electronics", image: mobileImg, target: "category-electronics" },
  { name: "Appliances", image: applianceImg, target: "category-healthcare" },
  { name: "Fashion", image: fashionImg, target: "category-fashion" },
  { name: "Beauty", image: beautyImg, target: "category-beauty" },
];

const CategoryCard = () => {
  return (
    <section className={styles.menuContainer} aria-label="Shop by category">
      <div className={styles.contents}>
        {categories.map((category) => (
          <CategoryItem key={category.name} {...category} />
        ))}
      </div>
    </section>
  );
};

export default CategoryCard;
