import React, { useState } from "react";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      return setError("All fields are required.");
    }

    try {
      const res = await axios.post("https://my-kart-server-3.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.status === 201) {
        alert("Signup successful!");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Signup failed.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSignup} className={styles.form}>
        <h2>Sign Up</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;
