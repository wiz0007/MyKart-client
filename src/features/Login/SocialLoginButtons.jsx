import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import styles from "./Login.module.scss";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const SocialLoginButtons = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      const res = await axios.post("https://my-kart-server-3.onrender.com/api/auth/google", {
        token: credential,
      });

      console.log("Login Success:", res.data);
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  const handleFacebookLogin = () => {
    alert("Facebook login coming soon...");
  };

  return (
    <div className={styles.socialButtons}>
      {/* Google login button */}
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />

      {/* Facebook placeholder */}
      {/* <button onClick={handleFacebookLogin}>
        <FaFacebook color="#1877F2" /> Continue with Facebook
      </button> */}
    </div>
  );
};

export default SocialLoginButtons;

