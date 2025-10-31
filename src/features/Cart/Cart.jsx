import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "react-lottie-player";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("https://my-kart-server-3.onrender.com/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCartItems(res.data.items);
        calculateTotal(res.data.items);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, [token, navigate]);

  const calculateTotal = (items) => {
    const sum = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotal(sum);
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;
    axios
      .put(
        "https://my-kart-server-3.onrender.com/api/cart/update",
        { productId, quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setCartItems(res.data.items);
        calculateTotal(res.data.items);
      })
      .catch((err) => console.error("Error updating quantity:", err));
  };

  const removeFromCart = (productId) => {
    axios
      .delete(
        `https://my-kart-server-3.onrender.com/api/cart/remove/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setCartItems(res.data.items);
        calculateTotal(res.data.items);
      })
      .catch((err) => console.error("Error removing item:", err));
  };

  const handleProceed = () => {
    navigate("/payment", { state: { cartItems, total } });
  };

  return (
    <div className={styles.cartPage}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Shopping Cart 🛒
      </motion.h2>

      {cartItems.length === 0 ? (
        <motion.div
          className={styles.emptyState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Lottie
            loop
            play
            speed={1.1}
            style={{ width: 300, height: 300, margin: "auto" }}
            animationData={require("../../assets/empty-cart.json")}
          />
          <h3>Your cart is feeling a little light!</h3>
          <p>Add something to make it happy 😄</p>
          <button onClick={() => navigate("/")} className={styles.shopBtn}>
            Continue Shopping
          </button>
        </motion.div>
      ) : (
        <>
          <div className={styles.cartWrapper}>
            <div className={styles.cartItems}>
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.product._id}
                    className={styles.cartItem}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={`https://my-kart-server-3.onrender.com${item.product.image}`}
                      alt={item.product.name}
                    />
                    <div className={styles.details}>
                      <h4>{item.product.name}</h4>
                      <p className={styles.price}>₹{item.product.price}</p>

                      <div className={styles.quantity}>
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <p className={styles.subtotal}>
                        Subtotal: ₹{item.product.price * item.quantity}
                      </p>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              className={styles.cartSummary}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Order Summary</h3>
              <p>
                Total: <strong>₹{total}</strong>
              </p>
              <button onClick={handleProceed} className={styles.checkoutBtn}>
                Proceed to Checkout
              </button>
            </motion.div>
          </div>

          {/* ✅ Floating summary bar for mobile */}
          <div className={styles.mobileSummaryBar}>
            <div className={styles.mobileSummaryContent}>
              <span className={styles.total}>Total: ₹{total}</span>
              <button
                className={styles.mobileCheckoutBtn}
                onClick={handleProceed}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

