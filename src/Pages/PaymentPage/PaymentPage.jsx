import React from "react";
import Payment from "../../features/Payment/Payment";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <Payment />
      <Footer />
    </div>
  );
};

export default LoginPage;