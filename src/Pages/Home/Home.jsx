import React from "react";
import Navbar from "../../Components/Navbar/Navbar"
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import Hero from "../../Components/Hero/Hero";
import CategoryProducts from "../../Components/ProductsLists/CategoryProducts";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <div className="Home">
      <Navbar />
      <CategoryCard />
      <Hero />
      <CategoryProducts category="Electronics" />
      <CategoryProducts category="Fashion" />
      <CategoryProducts category="Beauty" />
      <CategoryProducts category="Sports" />
      <CategoryProducts category="Healthcare" />
      <Footer/>
    </div>
  );
};

export default Home;
