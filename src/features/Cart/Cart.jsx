import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import styles from "./Cart.module.scss";
import { AuthContext } from "../../../context/AuthContext";

const API_BASE = "https://my-kart-server-3.onrender.com";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotal(sum);
  };

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/Login");
      return;
    }

    axios
      .get(`${API_BASE}/api/cart`, { withCredentials: true })
      .then((res) => {
        const items = res.data.items || [];
        setCartItems(items);
        calculateTotal(items);
      })
      .catch((err) => {
        if (err.response?.status === 401) navigate("/Login");
        console.error("Error fetching cart:", err);
      });
  }, [user, loading, navigate]);

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;

    axios
      .put(`${API_BASE}/api/cart/update`, { productId, quantity: newQty }, { withCredentials: true })
      .then((res) => {
        const items = res.data.items || [];
        setCartItems(items);
        calculateTotal(items);
      })
      .catch((err) => console.error("Error updating quantity:", err));
  };

  const removeFromCart = (productId) => {
    axios
      .delete(`${API_BASE}/api/cart/remove/${productId}`, { withCredentials: true })
      .then((res) => {
        const items = res.data.items || [];
        setCartItems(items);
        calculateTotal(items);
      })
      .catch((err) => console.error("Error removing item:", err));
  };

  const summary = useMemo(() => {
    const delivery = cartItems.length ? 40 : 0;
    const tax = total * 0.05;
    return { delivery, tax, payable: total + delivery + tax };
  }, [cartItems.length, total]);

  const handleProceed = () => {
    navigate("/payment", {
      state: {
        items: cartItems.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total,
      },
    });
  };

  return (
    <main className={styles.cartPage}>
      <section className={styles.cartHeader}>
        <h1>Your cart</h1>
      </section>

      {cartItems.length === 0 ? (
        <section className={styles.emptyState}>
          <ShoppingBag size={46} />
          <h2>Your cart is empty</h2>
          <button type="button" onClick={() => navigate("/")}>Continue shopping</button>
        </section>
      ) : (
        <section className={styles.cartWrapper}>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <article key={item.product._id} className={styles.cartItem}>
                <button
                  type="button"
                  className={styles.removeIcon}
                  onClick={() => removeFromCart(item.product._id)}
                  aria-label={`Remove ${item.product.name}`}
                >
                  <Trash2 size={17} />
                </button>
                <img src={`${API_BASE}${item.product.image}`} alt={item.product.name} />
                <div className={styles.details}>
                  <div>
                    <h3>{item.product.name}</h3>
                    <p className={styles.itemMeta}>
                      <Truck size={15} /> Fast dispatch available
                    </p>
                  </div>
                  <div className={styles.itemFooter}>
                    <strong>{formatPrice(item.product.price)}</strong>
                    <div className={styles.quantity}>
                      <button type="button" onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>
                        <Minus size={15} />
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
                  <p className={styles.subtotal}>Subtotal {formatPrice(item.product.price * item.quantity)}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className={styles.cartSummary}>
            <span className={styles.summaryEyebrow}>Order summary</span>
            <h2>{cartItems.length} item{cartItems.length > 1 ? "s" : ""}</h2>
            <div className={styles.summaryRows}>
              <p><span>Subtotal</span><strong>{formatPrice(total)}</strong></p>
              <p><span>Delivery</span><strong>{formatPrice(summary.delivery)}</strong></p>
              <p><span>Estimated tax</span><strong>{formatPrice(summary.tax)}</strong></p>
            </div>
            <div className={styles.totalRow}>
              <span>Total payable</span>
              <strong>{formatPrice(summary.payable)}</strong>
            </div>
            <button type="button" onClick={handleProceed} className={styles.checkoutBtn}>
              Checkout
              <ArrowRight size={18} />
            </button>
          </aside>
        </section>
      )}
    </main>
  );
};

export default Cart;
