import { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryPage.scss";
import IMG from "../../Assets/bg3.jpg"
import ProductCard from "../../Components/ProductCard/ProductCard";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/products/categories"
        );
        setCategories(data);
      } catch (error) {
        console.error("خطأ في تحميل الأقسام:", error);
      }
    };
    fetchCategories();
  }, []);

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url =
          selectedCategory === "all"
            ? "http://localhost:5000/api/products"
            : `http://localhost:5000/api/products/categories/${selectedCategory}`;
        const { data } = await axios.get(url);
        setProducts(data);
      } catch (error) {
        console.error("خطأ في تحميل المنتجات:", error);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="categories-page">
      <div className="hero">
        <img src={IMG} alt="الأقسام" />
        <h1>الأقسام</h1>
      </div>

      <div className="filters">
        <button
          className={selectedCategory === "all" ? "active" : ""}
          onClick={() => setSelectedCategory("all")}
        >
          الكل
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        ) : (
          <p className="empty">لا يوجد منتجات</p>
        )}
      </div>
    </div>
  );
}
