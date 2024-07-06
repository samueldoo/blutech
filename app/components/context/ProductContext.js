'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const initialDepartments = [
  { id: 1, img: "/Beauty.png", sku: "MG234567", name: "Gloss", title: "Beauty and glamour", description: "Lorem ipsum dolor sit amet consectetur.", brand: 18.0, costPrice: 38.0, quantity: 36, size: 1800, },
  { id: 2, img: "/Beauty.png", sku: "MG234567", name: "Gloss", title: "Beauty and glamour", description: "Lorem ipsum dolor sit amet consectetur.", brand: 18.0, costPrice: 38.0, quantity: 36, size: 1800, },
  { id: 3, img: "/Gadget.png", sku: "MG234567", name: "Gloss", title: "Gadget", description: "Lorem ipsum dolor sit amet consectetur.", brand: 18.0, costPrice: 38.0, quantity: 36, size: 1800, },
  { id: 4, img: "/shoe.png", sku: "MG234567", name: "Gloss", title: "Shoe", description: "Lorem ipsum dolor sit amet consectetur.", brand: 18.0, costPrice: 38.0, quantity: 36, size: 1800, },
  { id: 5, img: "/cream.png", sku: "MG234567", name: "Gloss", title: "Cream", description: "Lorem ipsum dolor sit amet consectetur.", brand: 18.0, costPrice: 38.0, quantity: 36, size: 1800, },
  { id: 6, img: "/Lotion.png", sku: "MG234567", name: "Gloss", title: "Lotions", description: "Lorem ipsum dolor sit amet consectetur.", brand: 18.0, costPrice: 38.0, quantity: 36, size: 1800, },
  { id: 7, img: "/Glamor.png", sku: "MG234567", name: "Gloss", title: "Beauty and glamour", description: "Lorem ipsum dolor sit amet consectetur.", brand: 18.0, costPrice: 38.0, quantity: 36, size: 1800, },
  { id: 8, img: "/Watch.png", sku: "MG234567", name: "Gloss", title: "Watch", description: "Lorem ipsum dolor sit amet consectetur.", brand: 18.0, costPrice: 38.0, quantity: 36, size: 1800, },
  { id: 9, img: "/Sneakers.png", sku: "MG234567", name: "Gloss", title: "Beauty and glamour", description: "Lorem ipsum dolor sit amet consectetur.", brand: 18.0, costPrice: 38.0, quantity: 36, size: 1800, },
  { id: 10, img: "/Arts.png", sku: "MG234567", name: "Gloss", title: "Beauty and glamour", description: "Lorem ipsum dolor sit amet consectetur.", brand: 18.0, costPrice: 38.0, quantity: 36, size: 1800, },
];

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialDepartments);
  const [filteredProducts, setFilteredProducts] = useState(initialDepartments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (params = {}) => {
    const queryParams = new URLSearchParams({
      supplier: params.supplier || '',
      first: params.first || 0,
      last: params.last || 50,
      search: params.search || '',
      ...Object.entries(params).reduce((acc, [key, value]) => {
        if (key.includes('_')) {
          acc[key] = value;
        }
        return acc;
      }, {})
    });
    
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products/public/catalog?${queryParams}`);
      const apiProducts = response.data;
      
      const mergedProducts = [...initialDepartments, ...apiProducts].reduce((acc, product) => {
        const existingProduct = acc.find(p => p.id === product.id);
        if (!existingProduct) {
          acc.push(product);
        }
        return acc;
      }, []);

      setProducts(mergedProducts);
      setFilteredProducts(mergedProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products');
      setLoading(false);
    }
  };

  const searchProducts = (searchTerm) => {
    const filtered = products.filter(product => 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <ProductContext.Provider value={{ products: filteredProducts, loading, error, searchProducts, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}