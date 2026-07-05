import React, { useState } from "react";
import axios from "axios";
import { Mail } from "lucide-react";
import styles from "./Login.module.scss";

const API_BASE = "https://my-kart-server-3.onrender.com";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email address is required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/api/auth/forgot-password`, { email }, { withCredentials: true });
      setMessage(res.data?.msg || "If an account exists, password reset instructions have been sent.");
    } catch (err) {
      setMessage(err.response?.data?.msg || "If an account exists, password reset instructions have been sent.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Reset password</h1>

        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.notice}>{message}</p>}

        <label className={styles.inputGroup}>
          <Mail size={18} />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <button type="submit" className={styles.loginBtn} disabled={loading}>
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </main>
  );
};

export default ForgotPassword;
