import React from 'react';
import './App.css';

const ProductList = () => {
  const products = [
    { id: 1, name: '产品A', price: 100 },
    { id: 2, name: '产品B', price: 200 },
    { id: 3, name: '产品C', price: 300 },
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src="/defaultProduct.jpg" alt="Product" />
          <h3>{product.name}</h3>
          <p>价格: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;