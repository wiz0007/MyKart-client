import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import styles from "./Login.module.scss";
import SocialLoginButtons from "./SocialLoginButtons";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) return setError("All fields are required.");

    try {
      const res = await axios.post("https://my-kart-server-3.onrender.com/api/auth/register", { name, email, password });
      if (res.status === 201) {
        alert("Signup successful. Please log in.");
        navigate("/Login");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Signup failed. Please try again.");
    }
  };

  return (
    <main className={styles.authContainer}>
      <form onSubmit={handleSignup} className={styles.form}>
        <h1>Sign up</h1>

        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.inputGroup}>
          <User size={18} />
          <input
            type="text"
            placeholder="Full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>

        <label className={styles.inputGroup}>
          <Mail size={18} />
          <input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </label>

        <label className={styles.inputGroup}>
          <LockKeyhole size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button type="button" className={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </label>

        <button type="submit" className={styles.loginBtn}>Sign up</button>

        <p className={styles.redirectText}>
          Have an account? <button type="button" onClick={() => navigate("/Login")}>Login</button>
        </p>

        <div className={styles.divider}><span>or</span></div>
        <SocialLoginButtons />
      </form>
    </main>
  );
};

export default Signup;
