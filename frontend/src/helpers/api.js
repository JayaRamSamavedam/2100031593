// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8888';

export const getProducts = async (category, n, page, sort, order, minPrice, maxPrice) => {
    const response = await axios.get(`${BASE_URL}/categories/${category}/products`, {
        params: { n, page, sort, order, minPrice, maxPrice }
    });
    const products = response.data;
    const totalProducts = parseInt(response.headers.get('x-total-count'), 10);
    return {
        products,
        total: totalProducts
    };
};

export const getProductById = async (id) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
};
