import React, { useState } from "react";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import SocialLoginButtons from "./SocialLoginButtons";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return setError("All fields are required.");
    }

    try {
      const res = await axios.post(
        "https://my-kart-server-3.onrender.com/api/auth/register",
        { name, email, password }
      );

      if (res.status === 201) {
        alert("Signup successful! Please log in.");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Signup failed. Please try again.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSignup} className={styles.form}>
        <h2 className={styles.heading}>Create Your Account ✨</h2>
        <p className={styles.subHeading}>Join MyKart today and start shopping!</p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
        </div>

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
          Sign Up
        </button>

        <p className={styles.redirectText}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className={styles.link}>
            Login
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

export default Signup;


