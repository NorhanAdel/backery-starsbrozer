import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.scss";

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.preventDefault();
    console.log(`أضفت ${quantity} من ${product.name}`);
  };

  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <img
        src={`http://localhost:5000/uploads/${product.image}`}
        alt={product.name}
        className="product-image"
      />

      <h3 className="product-name">{product.name}</h3>

      <p className="product-desc">{product.description.split("\n")[0]}</p>

      <div className="product-price">LE {product.price}</div>

      <div className="product-quantity">
        <button
          onClick={(e) => {
            e.preventDefault();
            setQuantity((q) => Math.max(1, q - 1));
          }}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={(e) => {
            e.preventDefault();
            setQuantity((q) => q + 1);
          }}
        >
          +
        </button>
      </div>

      <button className="add-to-cart" onClick={handleAddToCart}>
        أضف إلى السلة
      </button>
    </Link>
  );
}

export default ProductCard;
