import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Payment.module.scss";
import AddressSection from "./AdressSection";
import { AuthContext } from "../../../context/AuthProvider";

const Payment = () => {
  const { user } = useContext(AuthContext); // user may be null initially
  const location = useLocation();
  const { total = 0, items = [] } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState("card");

  const subtotal = Number(total) || 0;
  const delivery = 40;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + delivery + tax;

  const handlePayment = () => {
    alert(
      `Payment of ₹${grandTotal.toFixed(
        2
      )} done via ${selectedMethod.toUpperCase()} ✅`
    );
  };

  // ✅ Wait until user is loaded
  if (!user) return <p>Loading user info…</p>;

  return (
    <div className={styles.paymentWrapper}>
      <h1 className={styles.heading}>Checkout</h1>
      <div className={styles.paymentContainer}>
        <div className={styles.summarySection}>
          <h2>Order Summary</h2>
          <ul>
            {items?.map((item, idx) => (
              <li key={idx}>
                <span>{item.product?.name || "Product"}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <hr />
          <p>Subtotal: ₹{subtotal}</p>
          <p>Delivery: ₹{delivery}</p>
          <p>Tax (5%): ₹{tax.toFixed(2)}</p>
          <hr />
          <div className={styles.totalRow}>
            <span>Total Payable:</span>
            <span className={styles.total}>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className={styles.methodSection}>
          <h2>Payment Method</h2>

          <label>
            <input
              type="radio"
              name="method"
              value="card"
              checked={selectedMethod === "card"}
              onChange={() => setSelectedMethod("card")}
            />
            💳 Credit / Debit Card
          </label>

          <label>
            <input
              type="radio"
              name="method"
              value="upi"
              checked={selectedMethod === "upi"}
              onChange={() => setSelectedMethod("upi")}
            />
            📱 UPI
          </label>

          <label>
            <input
              type="radio"
              name="method"
              value="cod"
              checked={selectedMethod === "cod"}
              onChange={() => setSelectedMethod("cod")}
            />
            🚚 Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              name="method"
              value="wallet"
              checked={selectedMethod === "wallet"}
              onChange={() => setSelectedMethod("wallet")}
            />
            👛 Wallets
          </label>

          {/* ✅ Pass user._id safely */}
          <AddressSection userId={user?._id || user?.id} />

          <button className={styles.payBtn} onClick={handlePayment}>
            Pay ₹{grandTotal.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
