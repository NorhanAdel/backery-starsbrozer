import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const deleteProduct = (id) => {
    if (window.confirm("هل أنت متأكد من حذف المنتج؟")) {
      axios
        .delete(`http://localhost:5000/api/products/${id}`)
        .then(() => {
          setProducts(products.filter((p) => p._id !== id));
        })
        .catch((err) => console.error(err));
    }
  };

  const editProduct = (id) => {
    alert(`تعديل المنتج برقم: ${id}`);
  };

  return (
    <div>
      <h2>📦 قائمة المنتجات</h2>
      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>الصورة</th>
            <th>الاسم</th>
            <th>السعر</th>
            <th>التصنيف</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  width="50"
                />
              </td>
              <td>{product.name}</td>
              <td>{product.price} LE</td>
              <td>{product.category}</td>
              <td>
                <button
                  onClick={() => editProduct(product._id)}
                  className="btn-edit"
                >
                  ✏️ تعديل
                </button>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="btn-delete"
                >
                  🗑️ حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default ProductsList;
