import React, { useContext, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Banknote, CreditCard, Landmark, ShieldCheck, Smartphone, Wallet } from "lucide-react";
import styles from "./Payment.module.scss";
import AddressSection from "./AdressSection";
import { AuthContext } from "../../../context/AuthContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

const paymentMethods = [
  { value: "card", label: "Card", detail: "Credit or debit card", icon: CreditCard },
  { value: "upi", label: "UPI", detail: "PhonePe, GPay, Paytm", icon: Smartphone },
  { value: "wallet", label: "Wallet", detail: "Fast prepaid payments", icon: Wallet },
  { value: "cod", label: "COD", detail: "Pay on delivery", icon: Banknote },
];

const Payment = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { total = 0, items = [], cartItems = [] } = location.state || {};
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const normalizedItems = useMemo(() => {
    const source = items.length ? items : cartItems;
    return source.map((item) => ({
      product: item.product,
      quantity: item.quantity || 1,
      price: item.price ?? item.product?.price ?? 0,
    }));
  }, [cartItems, items]);

  const subtotal = Number(total) || normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal ? 40 : 0;
  const tax = subtotal * 0.05;
  const grandTotal = subtotal + delivery + tax;

  const handlePayment = () => {
    if (!selectedAddress) {
      alert("Please select or add a delivery address first.");
      return;
    }

    alert(`Payment of ${formatPrice(grandTotal)} started via ${selectedMethod.toUpperCase()}.`);
  };

  if (!user) {
    return (
      <main className={styles.paymentWrapper}>
        <section className={styles.loadingState}>Loading checkout details...</section>
      </main>
    );
  }

  return (
    <main className={styles.paymentWrapper}>
      <section className={styles.checkoutHeader}>
        <h1>Checkout</h1>
      </section>

      <section className={styles.paymentContainer}>
        <div className={styles.checkoutFlow}>
          <AddressSection userId={user?._id || user?.id} onSelectAddress={setSelectedAddress} />

          <div className={styles.methodSection}>
            <div className={styles.sectionTitle}>
              <Landmark size={20} />
              <div>
                <span>Step 2</span>
                <h2>Payment method</h2>
              </div>
            </div>

            <div className={styles.methodGrid}>
              {paymentMethods.map(({ value, label, detail, icon: Icon }) => (
                <label key={value} className={selectedMethod === value ? styles.selectedMethod : ""}>
                  <input
                    type="radio"
                    name="method"
                    value={value}
                    checked={selectedMethod === value}
                    onChange={() => setSelectedMethod(value)}
                  />
                  {React.createElement(Icon, { size: 20 })}
                  <span>
                    <strong>{label}</strong>
                    <small>{detail}</small>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className={styles.summarySection}>
          <span className={styles.summaryEyebrow}>Order summary</span>
          <h2>{normalizedItems.length || 0} item{normalizedItems.length === 1 ? "" : "s"}</h2>
          <ul>
            {normalizedItems.map((item, idx) => (
              <li key={`${item.product?._id || idx}-${idx}`}>
                <span>{item.product?.name || "Product"}</span>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </li>
            ))}
          </ul>
          <div className={styles.summaryRows}>
            <p><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></p>
            <p><span>Delivery</span><strong>{formatPrice(delivery)}</strong></p>
            <p><span>Tax</span><strong>{formatPrice(tax)}</strong></p>
          </div>
          <div className={styles.totalRow}>
            <span>Total payable</span>
            <strong>{formatPrice(grandTotal)}</strong>
          </div>
          <div className={styles.securityNote}>
            <ShieldCheck size={18} />
Secure payments
          </div>
          <button className={styles.payBtn} type="button" onClick={handlePayment}>
            Pay {formatPrice(grandTotal)}
          </button>
        </aside>
      </section>
    </main>
  );
};

export default Payment;



