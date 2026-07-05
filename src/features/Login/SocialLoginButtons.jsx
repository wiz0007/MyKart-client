import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { AuthContext } from "../../../context/AuthContext";

const API_BASE = "https://my-kart-server-3.onrender.com";

const SocialLoginButtons = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const res = await axios.post(`${API_BASE}/api/auth/google`, { token: credential }, { withCredentials: true });
      setUser(res.data.user || null);
      navigate("/");
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
      alert(error.response?.data?.msg || "Google login failed");
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
    alert("Google login failed");
  };

  return (
    <div className={styles.socialButtons}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default SocialLoginButtons;
