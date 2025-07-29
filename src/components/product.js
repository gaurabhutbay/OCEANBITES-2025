// src/data/products.js

const products = [
    {
        id: 'pcm-white-eggs',
        name: 'PCM White Eggs',
        image: '/assets/eggs.jpg', // update with actual path
        description: 'Fresh white eggs packed with high-quality protein.',
        options: [
            { label: '6 pcs', price: 45, originalPrice: 50 },
            { label: '12 pcs', price: 90, originalPrice: 100 },
            { label: '30 pcs', price: 210, originalPrice: 288 },
        ]
    },
    // Add more products here
];

export default products;