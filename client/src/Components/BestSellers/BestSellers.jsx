import React, { useEffect, useState } from "react";
import "./BestSellers.scss";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/bestSelling")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="best-sellers">
      <h2>الأكثر مبيعًا</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
