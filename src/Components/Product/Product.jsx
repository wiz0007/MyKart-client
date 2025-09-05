import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Product.module.scss";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [inCart, setInCart] = useState(false); // track if added to cart
  const navigate = useNavigate();

  useEffect(() => {
    // fetch product details
    axios
      .get(`https://my-kart-server-3.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));

    // check if product is already in cart
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://my-kart-server-3.onrender.com/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const found = res.data.items.some(
            (item) => item.product._id === id // 👈 match product in cart
          );
          if (found) setInCart(true);
        })
        .catch((err) => console.log("Cart check error:", err));
    }
  }, [id]);

  const addToCart = async (productId) => {
    try {
      await axios.post(
        "https://my-kart-server-3.onrender.com/api/cart/add",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setInCart(true); // show "Go to Cart"
    } catch (err) {
      alert("Login to access cart");
    }
  };

  if (!product) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.mainContainerProduct}>
      <div className={styles.productPage}>
        <div className={styles.imageSection}>
          <img
            src={`https://my-kart-server-3.onrender.com${product.image}`}
            alt={product.name}
          />
        </div>
        <div className={styles.detailsSection}>
          <h1>{product.name}</h1>
          <p className={styles.price}>₹{product.price}</p>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.buttons}>
            {inCart ? (
              <button
                onClick={() => navigate("/cart")}
                className={styles.cartBtn}
              >
                Go to Cart
              </button>
            ) : (
              <button
                onClick={() => addToCart(product._id)}
                className={styles.cartBtn}
              >
                Add to Cart
              </button>
            )}
            <button onClick={() => navigate("/payment")} className={styles.buyBtn}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

