import React, { useState } from "react";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import SocialLoginButtons from "./SocialLoginButtons";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return setError("All fields are required.");
    }

    try {
      const res = await axios.post(
        "https://my-kart-server-3.onrender.com/api/auth/login",
        { email, password }
      );

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.heading}>Welcome Back 👋</h2>
        <p className={styles.subHeading}>Log in to continue shopping</p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        {/* 👇 Password input with eye toggle */}
        <div className={styles.inputGroup}>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
        </div>

        <button type="submit" className={styles.loginBtn}>
          Login
        </button>

        <p className={styles.redirectText}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/Signup")} className={styles.link}>
            Sign Up
          </span>
        </p>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <SocialLoginButtons />
      </form>
    </div>
  );
};

export default Login;
