// src/assets/components/pages/ProductContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch or define your products here
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products"); // Replace with your API URL
        const data = await response.json();
        setProducts(data.products); // Access the products array from the response
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = (id) => {
  const { products } = useContext(ProductContext);

  if (!products) {
    console.error("Product list is undefined");
    return null;
  }

  const product = products.find((item) => item.id === id);

  if (!product) {
    console.error(`Product with id ${id} not found`);
    return null;
  }

  return product;
};

export { ProductProvider, useProduct };
