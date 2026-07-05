import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import CategoryCard from "../../Components/CategoryCard/CategoryCard";
import Hero from "../../Components/Hero/Hero";
import CategoryProducts from "../../Components/ProductsLists/CategoryProducts";
import Footer from "../../Components/Footer/Footer";
import "./Home.css";

const Home = () => {
  const categories = ["Electronics", "Fashion", "Beauty", "Sports", "Healthcare"];

  return (
    <div className="Home">
      <Navbar />
      <main className="homeShell">
        <CategoryCard />
        <Hero />
        {categories.map((category) => (
          <CategoryProducts key={category} category={category} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
