import React from 'react';
import './App.css';

const ProductList = () => {
  const products = [
    { id: 1, name: 'prodcutA', price: 100 },
    { id: 2, name: 'productB', price: 200 },
    { id: 3, name: 'productC', price: 300 },
  ];

  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src="/defaultProduct.jpg" alt="Product" />
          <h3>{product.name}</h3>
          <p>price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;