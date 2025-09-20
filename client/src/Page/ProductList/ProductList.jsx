import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductList.scss";
import CategoryFilter from "../../Components/CategoryFilter/CategoryFilter";
import ProductCard from "../../Components/ProductCard/ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data.slice(0, 10)))
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="products-section">
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="product-list">
        {filteredProducts.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>

      <div className="view-all-wrapper">
        <button className="view-all" onClick={() => navigate("/products")}>
          عرض كل المنتجات
        </button>
      </div>
    </div>
  );
}

export default ProductList;
