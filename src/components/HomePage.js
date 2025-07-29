// src/components/HomePage.js
import React from 'react';
import products from '../data/products';
import ProductCard from './ProductCard';

const HomePage = () => {
    return (
        <div className="p-4 grid grid-cols-2 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default HomePage;