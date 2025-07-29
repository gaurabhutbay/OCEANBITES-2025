// src/components/ProductCard.js
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-3 w-40 flex-shrink-0 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-28 h-28 object-cover rounded-xl mb-2"
      />
      <h3 className="text-sm font-semibold text-center">{product.name}</h3>
      <p className="text-green-600 font-bold mt-1">
        ₹{product.options[0].price}
      </p>
      <Link
        to={`/product/${product.id}`}
        className="mt-2 px-3 py-1 text-sm bg-orange-500 text-white rounded-xl hover:bg-orange-600"
      >
        Order
      </Link>
    </div>
  );
};

export default ProductCard;