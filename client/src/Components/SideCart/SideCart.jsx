import React, { useContext } from "react";
import "./SideCart.scss";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function SideCart({ isOpen, onClose }) {
  const { cartItems, totalPrice, removeFromCart, updateQuantity } =
    useContext(CartContext);

  return (
    <div className={`side-cart ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h3>عربة التسوق</h3>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="empty">سلة التسوق فارغة 🛒</p>
        ) : (
          cartItems.map((item) =>
            item.product ? (
              <div key={item._id} className="cart-item">
                <img
                  src={`http://localhost:5000/uploads/${item.product.image}`}
                  alt={item.product.name}
                />
                <div className="item-info">
                  <p className="name">{item.product.name}</p>
                  <p className="price">
                    LE {item.product.price} × {item.quantity}
                  </p>
                  <div className="actions">
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity - 1)
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                    <button onClick={() => removeFromCart(item.product._id)}>
                      🗑
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          )
        )}
      </div>

      {cartItems.some((item) => item.product) && (
        <div className="cart-footer">
          <div className="total">
            <span>المجموع الفرعي</span>
            <span>LE {totalPrice}</span>
          </div>
          <button className="checkout">الدفع</button>
          <Link to="/cart">
            <button className="view-cart">عرض عربة التسوق</button>
          </Link>
        </div>
      )}
    </div>
  );
}
