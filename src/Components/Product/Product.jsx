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
    // Fetch product details
    axios
      .get(`https://my-kart-server-3.onrender.com/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));

    // Check if product is already in cart
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://my-kart-server-3.onrender.com/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const found = res.data.items.some(
            (item) => item.product._id === id
          );
          if (found) setInCart(true);
        })
        .catch((err) => console.log("Cart check error:", err));
    }
  }, [id]);

  // Add product to cart
  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login to access cart");

    try {
      await axios.post(
        "https://my-kart-server-3.onrender.com/api/cart/add",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInCart(true);
    } catch (err) {
      alert("Failed to add to cart");
    }
  };

  // Buy Now: skip cart and go to payment
  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      // Optionally add to cart first (optional, but consistent with cart flow)
      if (!inCart) {
        await axios.post(
          "https://my-kart-server-3.onrender.com/api/cart/add",
          { productId: product._id, quantity: 1 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Navigate to Payment page with product info
      navigate("/payment", {
        state: {
          items: [
            {
              product,
              quantity: 1,
              price: product.price,
            },
          ],
          total: product.price,
        },
      });
    } catch (err) {
      alert("Failed to process Buy Now");
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

            <button className={styles.buyBtn} onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;


