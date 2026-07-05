import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import LoginPage from "../Pages/Login/LoginPage";
import SignupPage from "../Pages/Login/SignupPage";
import AuthShell from "../Pages/Login/AuthShell";
import OtpLogin from "../features/Login/OtpLogin";
import VerifyEmail from "../features/Login/VerifyEmail";
import ForgotPassword from "../features/Login/ForgotPassword";
import ResetPassword from "../features/Login/ResetPassword";
import ProductPage from "../Pages/ProductPage/ProductPage";
import CartPage from "../Pages/CartPage/CartPage";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/NotFound" element={<ErrorPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Signup" element={<SignupPage />} />
      <Route path="/OtpLogin" element={<OtpLogin />} />
      <Route path="/verify-email/:token" element={<AuthShell><VerifyEmail /></AuthShell>} />
      <Route path="/forgot-password" element={<AuthShell><ForgotPassword /></AuthShell>} />
      <Route path="/reset-password/:token" element={<AuthShell><ResetPassword /></AuthShell>} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/Cart" element={<CartPage />} />
      <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  );
};

export default AllRoutes;
