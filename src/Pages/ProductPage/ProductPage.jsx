import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Product from "../../Components/Product/Product";
import Footer from "../../Components/Footer/Footer";
import CategoryProducts from "../../Components/ProductsLists/CategoryProducts";

const ProductPage = () => {
  return (
    <div>
      <Navbar />
      <Product />
      <CategoryProducts category="Electronics" />
      <CategoryProducts category="Fashion" />
      <CategoryProducts category="Beauty" />
      <CategoryProducts category="Sports" />
      <CategoryProducts category="Healthcare" />
      <Footer />
    </div>
  );
};

export default ProductPage;
