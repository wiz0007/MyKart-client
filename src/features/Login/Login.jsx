import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import styles from "./Login.module.scss";
import SocialLoginButtons from "./SocialLoginButtons";
import { AuthContext } from "../../../context/AuthContext";

const API_BASE = "https://my-kart-server-3.onrender.com";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) return setError("All fields are required.");

    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password }, { withCredentials: true });
      setUser(res.data.user || null);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <main className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Login</h1>

        {error && <p className={styles.error}>{error}</p>}

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

        <button type="submit" className={styles.loginBtn}>Login</button>

        <p className={styles.redirectText}>
          <button type="button" onClick={() => navigate("/forgot-password")}>Forgot password?</button>
        </p>

        <p className={styles.redirectText}>
          New here? <button type="button" onClick={() => navigate("/Signup")}>Sign up</button>
        </p>

        <div className={styles.divider}><span>or</span></div>
        <SocialLoginButtons />
      </form>
    </main>
  );
};

export default Login;

