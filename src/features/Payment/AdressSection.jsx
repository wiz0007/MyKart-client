import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Home, MapPin, Plus, Save, X } from "lucide-react";
import styles from "./AddressSection.module.scss";

const API_BASE = "https://my-kart-server-3.onrender.com";

const AddressSection = ({ userId, onSelectAddress }) => {
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

  const selectAddress = useCallback((address) => {
    setSelectedAddress(address);
    onSelectAddress?.(address);
  }, [onSelectAddress]);

  const fetchAddresses = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/addresses/${userId}`, { withCredentials: true });
      const nextAddresses = res.data || [];
      setAddresses(nextAddresses);
      if (nextAddresses.length > 0) selectAddress(nextAddresses[0]);
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  }, [userId, selectAddress]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

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
      const res = await axios.post(`${API_BASE}/api/addresses`, { userId, ...form }, { withCredentials: true });
      const created = res.data;
      if (created) {
        setAddresses((prev) => [...prev, created]);
        selectAddress(created);
      }
      setAdding(false);
      resetForm();
    } catch (err) {
      console.error("Error adding address:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.addressSection}>
      <div className={styles.sectionTitle}>
        <MapPin size={20} />
        <div>
          <span>Step 1</span>
          <h2>Delivery address</h2>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingState}>Loading addresses...</div>
      ) : (
        <>
          {addresses.length > 0 && (
            <div className={styles.addressList}>
              {addresses.map((addr) => (
                <button
                  type="button"
                  key={addr._id}
                  className={`${styles.addressCard} ${selectedAddress?._id === addr._id ? styles.selected : ""}`}
                  onClick={() => selectAddress(addr)}
                >
                  <span className={styles.radioDot} />
                  <span className={styles.addressIcon}><Home size={18} /></span>
                  <span className={styles.addressText}>
                    <strong>{addr.fullName}</strong>
                    <small>{addr.street}</small>
                    <small>{addr.city}, {addr.state} {addr.postalCode}</small>
                    <small>{addr.country} | {addr.phone}</small>
                  </span>
                </button>
              ))}
            </div>
          )}

          {!adding && (
            <button type="button" className={styles.addAddressButton} onClick={() => setAdding(true)}>
              <Plus size={17} />
              {addresses.length ? "Add another address" : "Add delivery address"}
            </button>
          )}

          {adding && (
            <form className={styles.addressForm} onSubmit={onSubmit}>
              <input name="fullName" placeholder="Full name" value={form.fullName} onChange={onChange} required />
              <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} required />
              <input name="street" placeholder="House no., street, area" value={form.street} onChange={onChange} required />
              <input name="city" placeholder="City" value={form.city} onChange={onChange} required />
              <input name="state" placeholder="State" value={form.state} onChange={onChange} required />
              <input name="postalCode" placeholder="PIN code" value={form.postalCode} onChange={onChange} required />
              <input name="country" placeholder="Country" value={form.country} onChange={onChange} required />

              <div className={styles.formActions}>
                <button type="button" className={styles.btnSecondary} onClick={() => { setAdding(false); resetForm(); }}>
                  <X size={17} />
                  Cancel
                </button>
                <button type="submit" className={styles.btnPrimary} disabled={submitting}>
                  <Save size={17} />
                  {submitting ? "Saving..." : "Save address"}
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </section>
  );
};

export default AddressSection;



