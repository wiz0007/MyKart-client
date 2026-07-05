import React from "react";
import styles from "./CategoryItem.module.scss";

const CategoryItem = ({ image, name, target }) => {
  const scrollToCategory = () => {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button type="button" onClick={scrollToCategory} className={styles.itemContainer}>
      <img src={image} alt={name} className={styles.itemImg} />
      <span>{name}</span>
    </button>
  );
};

export default CategoryItem;
