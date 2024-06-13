// src/components/ProductFilter.js
import React, { useState } from 'react';

const ProductFilter = ({ onFilterChange }) => {
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState(''); // State for sorting by company, rating, price
    const [order, setOrder] = useState('');   // State for order: asc or desc
    const [n, setN] = useState('');           // State for top N products

    const handleFilterChange = () => {
        onFilterChange({ category, minPrice, maxPrice, sortBy, order, n });
    };

    const handleSortByChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleOrderChange = (e) => {
        setOrder(e.target.value);
    };

    const handleNChange = (e) => {
        setN(e.target.value);
    };

    return (
        <div className="p-4">
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="m-2 p-2 border border-gray-300" />
            <input type="number" placeholder="Top N" value={n} onChange={handleNChange} className="m-2 p-2 border border-gray-300" />
            <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="m-2 p-2 border border-gray-300" />
            <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="m-2 p-2 border border-gray-300" />
            
            <select value={sortBy} onChange={handleSortByChange} className="m-2 p-2 border border-gray-300">
                <option value="">Sort By</option>
                <option value="company">Company</option>
                <option value="rating">Rating</option>
                <option value="price">Price</option>
            </select>

            <select value={order} onChange={handleOrderChange} className="m-2 p-2 border border-gray-300">
                <option value="">Order By</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>

            <button onClick={handleFilterChange} className="m-2 p-2 bg-blue-500 text-white">Apply Filters</button>
        </div>
    );
};

export default ProductFilter;
