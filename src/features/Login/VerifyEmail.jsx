import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/verify-email/${token}`);
        setMessage(res.data.msg || "Email verified successfully.");
        setSuccess(true);

        // Optional: redirect after a delay
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        setMessage(err.response?.data?.msg || "Verification failed.");
        setSuccess(false);
      }
    };

    if (token) verify();
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>{success === null ? "Please wait..." : success ? "Success!" : "Oops!"}</h2>
      <p>{message}</p>
      {success && <p>Redirecting to login...</p>}
    </div>
  );
};

export default VerifyEmail;
