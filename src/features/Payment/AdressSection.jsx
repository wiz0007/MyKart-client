import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AddressSection.module.scss";

const AddressSection = ({ userId, onProceed }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const token = localStorage.getItem("token");
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  // Fetch addresses
  const fetchAddresses = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/addresses/${userId}`,
        { headers: authHeader }
      );
      setAddresses(res.data || []);
      // auto-select first address
      if (res.data?.length > 0) setSelectedAddress(res.data[0]);
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  // Form handlers
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;
    setSubmitting(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/addresses",
        { userId, ...form },
        { headers: authHeader }
      );

      const created = res.data;
      if (created) {
        setAddresses((prev) => [...prev, created]);
        setSelectedAddress(created); // select newly added
      }
      setAdding(false);
      resetForm();
    } catch (err) {
      console.error("Error adding address:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleProceedToPayment = () => {
    if (selectedAddress && onProceed) {
      onProceed(selectedAddress);
    }
  };

  if (loading) return <p>Loading addresses…</p>;

  return (
    <div className={styles.addressSection}>
      <h3>Delivery Address</h3>

      {addresses.length === 0 && !adding && (
        <button className={styles.btnPrimary} onClick={() => setAdding(true)}>
          + Add Address
        </button>
      )}

      {addresses.length > 0 && (
        <>
          <div className={styles.addressList}>
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className={`${styles.addressCard} ${
                  selectedAddress?._id === addr._id ? styles.selected : ""
                }`}
                onClick={() => setSelectedAddress(addr)}
              >
                <input
                  type="radio"
                  name="selectedAddress"
                  checked={selectedAddress?._id === addr._id}
                  readOnly
                />
                <p><b>{addr.fullName}</b></p>
                <p>{addr.street}</p>
                <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                <p>{addr.country}</p>
                <p>📞 {addr.phone}</p>
              </div>
            ))}
          </div>

          {!adding && (
            <button
              className={styles.btnSecondary}
              onClick={() => setAdding(true)}
            >
              + Add Another Address
            </button>
          )}

          {/* {selectedAddress && (
            <button
              className={styles.btnPrimary}
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </button>
          )} */}
        </>
      )}

      {adding && (
        <form className={styles.addressForm} onSubmit={onSubmit}>
          <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={onChange} required />
          <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} required />
          <input name="street" placeholder="House no., Street, Area" value={form.street} onChange={onChange} required />
          <input name="city" placeholder="City" value={form.city} onChange={onChange} required />
          <input name="state" placeholder="State" value={form.state} onChange={onChange} required />
          <input name="postalCode" placeholder="PIN Code" value={form.postalCode} onChange={onChange} required />
          <input name="country" placeholder="Country" value={form.country} onChange={onChange} required />

          <div className={styles.formActions}>
            <button type="button" className={styles.btnSecondary} onClick={() => { setAdding(false); resetForm(); }}>
              Cancel
            </button>
            <button type="submit" className={styles.btnPrimary} disabled={submitting}>
              {submitting ? "Saving…" : "Save Address"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddressSection;


