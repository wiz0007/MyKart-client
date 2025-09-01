import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./CategoryProducts.module.scss";

const CategoryProducts = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/category/${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [category]);

  return (
    <div className={styles.categorySection}>
      <h2>Best of {category}</h2>
      <div className={styles.sliderWrapper}>
        {products.map((product) => (
          <Link style={{textDecoration:'none'}}
            to={`/product/${product._id}`} 
            key={product._id} 
            className={styles.card}
          >
            <img src={`http://localhost:5000${product.image}`} alt={product.name} />
            <div className={styles.productTitle}>{product.name}</div>
            <div className={styles.productPrice}>From ₹{product.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;


