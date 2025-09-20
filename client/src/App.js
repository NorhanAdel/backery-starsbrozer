import "./App.css";
import Footer from "./Container/Footer/Footer";
import Login from "./Page/Auth/Login";
import Register from "./Page/Auth/Register";

import Home from "./Page/Home/Home";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./Page/ProductDetails/ProductDetails";
import Navbar from "./Container/Navbar/Navbar";
import Cart from "./Page/Cart/Cart.jsx";
import Checkout from "./Page/Checkout/Checkout";
import AdminDashboard from "./Page/AdminDashboard/AdminDashboard";
import Products from "./Page/Products/Products";
import Contact from "./Page/Contact/Contact";
import CategoriesPage from "./Page/CategoryPage/CategoryPage";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partion" element={<CategoriesPage />} />
        <Route path="register" element={ <Register/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
