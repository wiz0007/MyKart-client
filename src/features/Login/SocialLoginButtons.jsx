import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

const SocialLoginButtons = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      // Call backend Google login
      const res = await axios.post(
        "https://my-kart-server-3.onrender.com/api/auth/google",
        { token: credential }
      );

      const { token, user } = res.data;

      // Store token and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to home page
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
      {/* Google login button */}
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default SocialLoginButtons;
