import React from "react";
import BestSellers from "../../Components/BestSellers/BestSellers";
import Categories from "../../Components/Categories/Categories";
import CustomerReviews from "../../Components/CustomerReviews/CustomerReviews";
import FeaturesSection from "../../Components/FeaturesSection/FeaturesSection";
import Hero from "../../Components/Hero/Hero";
import MapSection from "../../Components/MapSection/MapSection";
import Navbar from "../../Container/Navbar/Navbar";
import ProductList from "../ProductList/ProductList";

function Home() {
  return (
    <div>
    
      <Hero />
      <ProductList />
      <FeaturesSection/>
      <Categories/>
      <BestSellers/>
      <MapSection/>
      <CustomerReviews/>
    </div>
  );
}

export default Home;
