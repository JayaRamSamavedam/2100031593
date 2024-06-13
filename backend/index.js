const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const BASE_URL = 'http://20.244.56.144/test/companies';

const COMPANIES = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
const CATEGORIES = [
    'Phone', 'Computer', 'TV', 'Earphone', 'Tablet', 'Charger',
    'Mouse', 'Keypad', 'Bluetooth', 'Pendrive', 'Remote', 'Speaker',
    'Headset', 'Laptop', 'PC'
];

// Access token
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4MjU2NzQyLCJpYXQiOjE3MTgyNTY0NDIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE5YTQxZmQyLWEyYjctNGU2Yy1iZDQ5LTI4ZTAyMjYyYmEzMiIsInN1YiI6IjIxMDAwMzE1OTNjc2VoQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IksgTCBVbml2ZXJzaXR5IiwiY2xpZW50SUQiOiJhOWE0MWZkMi1hMmI3LTRlNmMtYmQ0OS0yOGUwMjI2MmJhMzIiLCJjbGllbnRTZWNyZXQiOiJFY1VWU01zRlNsY2FGaU9TIiwib3duZXJOYW1lIjoiSmF5YSBSYW0gU2FtYXZlZGFtIiwib3duZXJFbWFpbCI6IjIxMDAwMzE1OTNjc2VoQGdtYWlsLmNvbSIsInJvbGxObyI6IjIxMDAwMzE1OTMifQ.SoAdl0TPIf9t766AeJKAsZAwKbLNA7aAu3HJftdNHms";

// Middleware to validate category and company
app.use('/categories/:categoryname/products', (req, res, next) => {
    const { categoryname } = req.params;
    if (!CATEGORIES.includes(categoryname)) {
        return res.status(400).json({ error: 'Invalid category name' });
    }
    next();
});

// Helper function to generate a unique identifier
const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

// Helper function to fetch products from all companies
const fetchProducts = async (categoryname, n, minPrice, maxPrice) => {
    const productPromises = COMPANIES.map(company => {
        const url = `${BASE_URL}/${company}/categories/${categoryname}/products?top=${n}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        return axios.get(url, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        }).then(response => response.data).catch(error => {
            console.error(`Error fetching products from ${company}:`, error);
            return [];
        });
    });

    const allProducts = await Promise.all(productPromises);
    return allProducts.flat().map(product => ({
        ...product,
        id: generateUniqueId(),
        company: product.company || 'Unknown'
    }));
};

// Route to get top N products within a category
app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { n = 10, page = 1, sort = 'rating', order = 'desc', minPrice = 0, maxPrice = Infinity } = req.query;

    try {
        let products = await fetchProducts(categoryname, n, minPrice, maxPrice);

        // Sorting logic
        products.sort((a, b) => {
            if (order === 'asc') {
                return a[sort] - b[sort];
            } else {
                return b[sort] - a[sort];
            }
        });

        // Pagination logic
        const startIndex = (page - 1) * n;
        const paginatedProducts = products.slice(startIndex, startIndex + n);

        res.json(paginatedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Store fetched products in memory for quick retrieval by ID
const productCache = {};

// Mock function to fetch product by ID
const getProductById = (id) => {
    return productCache[id] || null;
};

// Route to get details of a specific product by ID
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = getProductById(id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// Populate the cache whenever products are fetched
app.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    const { n = 10, page = 1, sort = 'rating', order = 'desc', minPrice = 0, maxPrice = Infinity } = req.query;

    try {
        let products = await fetchProducts(categoryname, n, minPrice, maxPrice);

        // Populate the cache
        products.forEach(product => {
            productCache[product.id] = product;
        });

        // Sorting logic
        products.sort((a, b) => {
            if (order === 'asc') {
                return a[sort] - b[sort];
            } else {
                return b[sort] - a[sort];
            }
        });

        // Pagination logic
        const startIndex = (page - 1) * n;
        const paginatedProducts = products.slice(startIndex, startIndex + n);

        res.json(paginatedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
