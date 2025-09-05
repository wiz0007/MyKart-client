import React from "react";
import styles from "./CategoryItem.module.scss";
import { useNavigate } from "react-router-dom";

const CategoryItem = (props) => {
  const navigate = useNavigate();

  const handle404Click = () => {
    navigate("/NotFound");
  };
  return (
    <div onClick={handle404Click} className={styles.itemContainer}>
      <img src={props.image} alt="image" className={styles.itemImg} />
      <a href={props.link} className={styles.itemName}>
        {props.name}
      </a>
    </div>
  );
};

export default CategoryItem;
