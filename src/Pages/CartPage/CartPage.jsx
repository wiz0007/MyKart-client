import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Cart from "../../features/Cart/Cart";

const CartPage = () => {
  return (
    <div>
      <Navbar />
      <Cart />
      <Footer />
    </div>
  );
};

export default CartPage;