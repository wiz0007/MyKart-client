import React from 'react'
import styles from "./CategoryItem.module.scss";

const CategoryItem = (props) => {
  return (
    <div className={styles.itemContainer}>
      <img src={props.image} alt="image" className={styles.itemImg} />
      <a href={props.link} className={styles.itemName}>{props.name}</a>
    </div>
  )
}
 
export default CategoryItem
