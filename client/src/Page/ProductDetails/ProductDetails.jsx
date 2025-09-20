import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductDetails.scss";
import { CartContext } from "../../Context/CartContext";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { FaTools, FaUsers, FaBolt, FaLeaf } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleAdd = () => {
    if (!product?._id) return;
    addToCart(product, quantity);
    setAdded(true);
    toast.success(`تم إضافة ${quantity} × ${product.name} للسلة`, {
      position: "top-right",
      autoClose: 2000,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="bread-loader">
        <div className="bread"></div>
      </div>
    );
  }

  const related = allProducts
    .filter((p) => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  const features = [
    { text: "صُنع بعناية لضمان أعلى جودة.", icon: <FaTools /> },
    { text: "مناسب لجميع أفراد العائلة.", icon: <FaUsers /> },
    { text: "يحافظ على صحتك ويمدك بالطاقة.", icon: <FaBolt /> },
    { text: "خالي من أي إضافات صناعية ضارة.", icon: <FaLeaf /> },
  ];

  return (
    <div className="product-details">
      <div className="top-section">
        <div className="product-image-section">
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
          />
        </div>

        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="price">LE {product.price}</p>

          <div className="rating">
            <span>49</span>
            <span>⭐</span>
            <span>⭐⭐⭐⭐⭐</span>
            <span className="rating-text">عملاء راضين</span>
          </div>

          <p className="description">{product.description}</p>

          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index}>
                <span className="icon">{feature.icon}</span>
                {feature.text}
              </li>
            ))}
          </ul>

          <div className="buy_deatils">
            <div className="quantity">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>

            <div className="actions">
              <button className="add-to-cart" onClick={handleAdd}>
                أضف إلى السلة
              </button>
            </div>
          </div>

          {added && (
            <p style={{ color: "green", marginTop: "10px" }}>
              تم إضافة المنتج للسلة
            </p>
          )}
        </div>
      </div>

      <div className="extra-details">
        <div className="extra-wrapper">
          <div className="extra-image">
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.name}
            />
          </div>
          <div className="extra-text">
            <h3>تفاصيل المنتج</h3>
            <p>
              {product.longTitle
                ? product.longTitle
                : "هذا المنتج يتميز بجودة عالية وفوائد عديدة لصحة الجسم."}
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="related-products">
          <h3>منتجات مشابهة</h3>
          <div className="related-list">
            {related.map((item) => (
              <ProductCard product={item} key={item._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
