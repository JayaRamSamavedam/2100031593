// src/components/ProductDetail.js
import React from 'react';

const ProductDetail = ({ product }) => {
    return (
        <div className="max-w-lg rounded overflow-hidden shadow-lg p-4 mx-auto">
            {/* <img className="w-full" src={`https://source.unsplash.com/random?sig=${product.id}`} alt={product.productName} /> */}
            <div className="px-6 py-4">
                <div className="font-bold text-2xl mb-2">{product.productName}</div>
                <p className="text-gray-700 text-base">Company: {product.company}</p>
                <p className="text-gray-700 text-base">Category: {product.category}</p>
                <p className="text-gray-700 text-base">Price: ${product.price}</p>
                <p className="text-gray-700 text-base">Rating: {product.rating}</p>
                <p className="text-gray-700 text-base">Discount: {product.discount}%</p>
                <p className="text-gray-700 text-base">Availability: {product.availability}</p>
            </div>
        </div>
    );
};

export default ProductDetail;
