// frontend/src/Pages/Cart/Cart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Cart.module.scss";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Fetch token from localStorage (or context if you are using Redux/AuthContext)
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login"); // force login if no token
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
      .catch((err) => {
        console.error("Error fetching cart:", err);
      });
  }, [token, navigate]);

  // Function to calculate total price
  const calculateTotal = (items) => {
    const sum = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotal(sum);
  };

  // Update quantity
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

  // Remove item from cart
  const removeFromCart = (productId) => {
    axios
      .delete(`https://my-kart-server-3.onrender.com/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCartItems(res.data.items);
        calculateTotal(res.data.items);
      })
      .catch((err) => console.error("Error removing item:", err));
  };

  const handleProceed = () => {
    navigate("/payment", {
      state: {
        cartItems,
        total,
      },
    });
  };

  return (
    <div className={styles.cartPage}>
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <span onClick={() => navigate("/")}>Continue shopping</span>
        </p>
      ) : (
        <div className={styles.cartWrapper}>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <div key={item.product._id} className={styles.cartItem}>
                <img
                  src={`https://my-kart-server-3.onrender.com${item.product.image}`}
                  alt={item.product.name}
                />
                <div className={styles.details}>
                  <h4>{item.product.name}</h4>
                  <p>₹{item.product.price}</p>
                  <div className={styles.quantity}>
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity - 1)
                      }
                    >
                      -
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
                  <p>Subtotal: ₹{item.product.price * item.quantity}</p>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <h3>Order Summary</h3>
            <p>Total: ₹{total}</p>
            <button onClick={handleProceed} className={styles.checkoutBtn}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
