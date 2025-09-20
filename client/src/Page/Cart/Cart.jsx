import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import "./Cart.scss";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, totalPrice } =
    useContext(CartContext);

  return (
    <div className="cart-page">
      <h2>🛒 سلة التسوق</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">السلة فارغة</p>
      ) : (
        <div className="cart-wrapper">
          <table className="cart-table">
            <thead>
              <tr>
                <th>المنتج</th>
                <th>الصورة</th>
                <th>السعر</th>
                <th>الكمية</th>
                <th>الإجمالي</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td className="product-name">{item.product?.name}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/uploads/${item.product?.image}`}
                      alt={item.product?.name}
                      className="cart-img"
                    />
                  </td>
                  <td>LE {item.product?.price}</td>
                  <td>
                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>LE {item.product?.price * item.quantity}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.product._id)}
                    >
                      إزالة ✖
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-footer">
            <div className="notes">
              <h4>ملاحظات الطلب</h4>
              <textarea placeholder="اكتب ملاحظاتك هنا..."></textarea>
            </div>

            <div className="summary">
              <h3>المجموع الفرعي: LE {totalPrice}</h3>
              <p>تشمل الضريبة. الشحن محسوب عند الدفع.</p>
              <div className="summary-actions">
                <button
                  className="continue-btn"
                  onClick={() => navigate("/")}
                >
                  مواصلة التسوق
                </button>
                <button
                  className="checkout-btn"
                  onClick={() => navigate("/checkout")}
                >
                  المتابعة إلى الدفع
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
