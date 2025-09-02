import React from "react";
import Signup from "../../features/Login/Signup";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const SignupPage = () => {
  return (
    <div>
      <Navbar />

      <Signup />
      <Footer />
    </div>
  );
};

export default SignupPage;
