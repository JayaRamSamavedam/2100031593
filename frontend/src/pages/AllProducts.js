import React, { useState, useEffect } from 'react';
import { getProducts } from '../helpers/api'; // Assuming getProducts is in api.js
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts(
        filters.category,
        filters.n, // Remove pageSize from parameters
        1, // Remove currentPage from parameters
        filters.sortBy || 'rating',
        filters.order || 'desc',
        filters.minPrice || 0,
        filters.maxPrice || Infinity
      );

      setProducts(response.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle error if needed
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto">
      <ProductFilter onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
