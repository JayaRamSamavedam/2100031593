// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProducts from './pages/AllProducts';
import ProductPage from './pages/ProductPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AllProducts />} />
                <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
        </Router>
    );
};

export default App;
