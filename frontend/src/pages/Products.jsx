import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { token, role } = useContext(AuthContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!token) return alert('please login first');
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      alert('delete failed');
    }
  };

  return (
    <div>
      <h2>产品列表</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <strong>{product.name}</strong> - ${product.price}
            {role === 'admin' && (
              <button onClick={() => handleDelete(product._id)}>delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;