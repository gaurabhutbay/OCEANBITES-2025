// src/components/ProductDetail.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = ({ groupedProducts, addToCart }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const allProducts = Object.values(groupedProducts).flat();
  const product = allProducts.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="p-4">
        <p className="text-center">Product not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 block mx-auto px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <img src={product.image} alt={product.name} className="w-full max-h-60 object-cover rounded" />

      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">₹{product.price}</p>

      {/* Qty Control */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setQuantity(q => (q > 1 ? q - 1 : 1))}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          −
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => setQuantity(q => q + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          +
        </button>
      </div>

      <button
        onClick={() => {
          for (let i = 0; i < quantity; i++) {
            addToCart(product);
          }
          navigate(-1);
        }}
        className="w-full bg-yellow-500 text-white py-2 rounded font-semibold"
      >
        Add {quantity} to Cart – ₹{product.price * quantity}
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Product Details</h3>
        <p className="text-gray-700 mt-2">{product.description || 'Delicious product from Ocean Bites.'}</p>
      </div>
    </div>
  );
};

export default ProductDetail;