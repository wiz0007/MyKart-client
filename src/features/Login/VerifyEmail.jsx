import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.scss";

const API_BASE = "https://my-kart-server-3.onrender.com";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/auth/verify-email/${token}`);
        setMessage(res.data.msg || "Email verified successfully.");
        setSuccess(true);
        window.setTimeout(() => navigate("/Login"), 1800);
      } catch (err) {
        setMessage(err.response?.data?.msg || "Verification failed.");
        setSuccess(false);
      }
    };

    if (token) verify();
  }, [token, navigate]);

  return (
    <main className={styles.authContainer}>
      <section className={styles.form}>
        <h1>{success === null ? "Verifying" : success ? "Verified" : "Link expired"}</h1>
        <p className={success === false ? styles.error : styles.notice}>{message}</p>
      </section>
    </main>
  );
};

export default VerifyEmail;
