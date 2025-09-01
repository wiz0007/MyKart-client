import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage"
import LoginPage from "../Pages/Login/LoginPage";
import Signup from "../features/Login/Signup";
import OtpLogin from "../features/Login/OtpLogin";
import VerifyEmail from "../features/Login/VerifyEmail";
import ProductPage from "../Pages/ProductPage/ProductPage";
import CartPage from "../Pages/CartPage/CartPage";
import PaymentPage from "../Pages/PaymentPage/PaymentPage"


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/NotFound" element={<ErrorPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/OtpLogin" element={<OtpLogin />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/Cart" element={<CartPage />} />
      <Route path="/payment" element={<PaymentPage />} />

    </Routes>
  );
};

export default AllRoutes;
