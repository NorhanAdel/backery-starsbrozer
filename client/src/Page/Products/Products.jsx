import { useEffect, useState, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";
import "./Products.scss";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Bg from "../../Assets/bg2.jpg"
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");  
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="loading">جاري التحميل...</div>;

  return (
    <div className="products-page">
      <section className="hero">
        <img src={Bg} alt="منتجاتنا" />
        <div className="overlay">
          <h1>منتجاتنا</h1>
          <p>اكتشف أشهى المخبوزات الطازجة كل يوم</p>
        </div>
      </section>

      <section className="products-grid">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </section>
    </div>
  );
}
