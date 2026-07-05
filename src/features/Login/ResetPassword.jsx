import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import styles from "./Login.module.scss";

const API_BASE = "https://my-kart-server-3.onrender.com";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/api/auth/reset-password/${token}`, { password }, { withCredentials: true });
      setMessage(res.data?.msg || "Password reset successful.");
      window.setTimeout(() => navigate("/Login"), 1800);
    } catch (err) {
      setError(err.response?.data?.msg || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>New password</h1>

        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.notice}>{message}</p>}

        <label className={styles.inputGroup}>
          <LockKeyhole size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="button" className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </label>

        <label className={styles.inputGroup}>
          <LockKeyhole size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>

        <button type="submit" className={styles.loginBtn} disabled={loading}>
          {loading ? "Saving..." : "Save password"}
        </button>
      </form>
    </main>
  );
};

export default ResetPassword;
