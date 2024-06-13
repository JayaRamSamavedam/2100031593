// src/pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../helpers/api';
import ProductDetail from '../components/ProductDetail';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
        const response = await getProductById(id);
        setProduct(response);
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    return (
        <div className="container mx-auto">
            {product ? <ProductDetail product={product} /> : <p>Loading...</p>}
        </div>
    );
};

export default ProductPage;
