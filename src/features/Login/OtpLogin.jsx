import React, { useState } from "react";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";

const OtpLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

  const sendOtp = () => {
    if (phone.length !== 10) return alert("Enter a valid number");
    setShowOtp(true);
  };

  const verifyOtp = () => {
    if (otp === "1234") {
      navigate("/dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.form}>
        <h2>OTP Login</h2>
        {!showOtp ? (
          <>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={sendOtp}>Send OTP</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp}>Verify OTP</button>
          </>
        )}
      </div>
    </div>
  );
};

export default OtpLogin;
