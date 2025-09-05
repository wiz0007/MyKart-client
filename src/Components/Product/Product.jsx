import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Product.module.scss";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(true); // track API loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://my-kart-server-3.onrender.com/api/products/${id}`
        );
        setProduct(res.data);

        // Check if already in cart
        const token = localStorage.getItem("token");
        if (token) {
          const cartRes = await axios.get(
            "https://my-kart-server-3.onrender.com/api/cart",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          const found = cartRes.data.items.some(
            (item) => item.product._id === id
          );
          if (found) setInCart(true);
        }

        setLoading(false);
      } catch (err) {
        console.error("Product fetch error:", err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Add to cart
  const addToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "https://my-kart-server-3.onrender.com/api/cart/add",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInCart(true);
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart.");
    }
  };

  // Buy Now
  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    try {
      // Optionally add to cart if not already
      if (!inCart) {
        await axios.post(
          "https://my-kart-server-3.onrender.com/api/cart/add",
          { productId: product._id, quantity: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Navigate to payment with this single product
      navigate("/payment", {
        state: {
          items: [
            { product, quantity: 1, price: product.price }
          ],
          total: product.price,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to process Buy Now");
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!product) return <div className={styles.loading}>Product not found</div>;

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
                onClick={addToCart}
                className={styles.cartBtn}
              >
                Add to Cart
              </button>
            )}

            <button
              className={styles.buyBtn}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
