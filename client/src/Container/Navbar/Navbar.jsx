import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, X, Menu } from "lucide-react";
import "./Navbar.scss";
import { navLink } from "../../Constant/nav";
import { CartContext } from "../../Context/CartContext";
import { UserContext } from "../../Context/UserContext";
import SideCart from "../../Components/SideCart/SideCart";
import axios from "axios";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { cartItems, totalPrice } = useContext(CartContext);
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/products/search?keyword=${query}`
        );
        setResults(data);
      } catch (error) {
        console.error("خطأ في البحث:", error);
      }
    };
    const timer = setTimeout(fetchProducts, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (id) => {
    setQuery("");
    setResults([]);
    setShowSearch(false);
    navigate(`/product/${id}`);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <a href="/">
            <h1>
              برونز <span>ستارز</span>
            </h1>
          </a>
        </div>

        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          {navLink.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="icons">
          <button onClick={() => setShowSearch(true)}>
            <Search size={22} />
          </button>

          {user ? (
            <div
              className="user-menu"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <h2 className="name">
                {user && user.name ? user.name.charAt(0).toUpperCase() : ""}
              </h2>
              {showUserMenu && (
                <div className="dropdown">
                  <NavLink to="/profile">حسابي</NavLink>
                  <NavLink to="/orders">طلباتي</NavLink>
                  <button onClick={logoutUser}>تسجيل خروج</button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="login-link">
              تسجيل الدخول
            </NavLink>
          )}

          {user && user.isAdmin ? (
            <NavLink to="/admin" className="dashboard-btn">
              لوحة التحكم 🛠
            </NavLink>
          ) : (
            <button
              className="cart-icon"
              onClick={() => setIsCartOpen(true)}
              style={{ position: "relative" }}
            >
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </button>
          )}

          <button
            className="menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {showSearch && (
        <div className="search-overlay">
          <button className="close-btn" onClick={() => setShowSearch(false)}>
            <X size={28} />
          </button>
          <h2>ابحث عن منتج</h2>
          <div className="search-box relative">
            <input
              type="text"
              placeholder="اكتب اسم المنتج..."
              value={query}
              autoFocus
              onChange={(e) => setQuery(e.target.value)}
            />

            {(results.length > 0 || query.trim() !== "") && (
              <ul className="absolute bg-white border mt-1 w-full rounded shadow z-50 max-h-60 overflow-y-auto">
                {results.length > 0 ? (
                  results.map((item) => (
                    <li
                      key={item._id}
                      className="p-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => handleSelect(item._id)}
                    >
                      <img
                        src={`http://localhost:5000/uploads/${item.image}`}
                        alt={item.name}
                        className="w-8 h-8 rounded object-cover border"
                      />
                      <span>{item.name}</span>
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500 text-center">
                    لا يوجد منتجات
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      )}

      {user && !user.isAdmin && (
        <SideCart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          total={totalPrice}
        />
      )}
    </>
  );
}
