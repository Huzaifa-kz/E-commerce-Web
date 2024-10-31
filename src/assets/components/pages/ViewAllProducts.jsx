import React, { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { FaHeart, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
function ViewAllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        const formattedProducts = data.products.map((product) => ({
          id: product.id,
          image: product.thumbnail,
          name: product.title,
          price: product.price,
          rating: product.rating,
          reviews: product.stock,
        }));
        setProducts(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };
  const handleViewLess = () => {
    navigate("/"); // Navigate to the home page or previous page
  };
  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1, salePrice: product.price }); // Ensure salePrice is set
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <button
          onClick={handleViewLess}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          View Less
        </button>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-9">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-lg min-w-[250px]"
              >
                <Skeleton height={150} />
                <div className="mt-4">
                  <Skeleton width={100} />
                </div>
                <Skeleton count={2} />
              </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-9">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-lg group relative"
            >
              <div className="flex justify-end">
                <div className="flex flex-col gap-2 text-gray-500">
                  <button onClick={() => toggleFavorite(product.id)}>
                    <FaHeart
                      className={`${
                        favorites[product.id] ? "text-red-500" : "text-gray-500"
                      }`}
                    />
                  </button>
                  <Link to={`/product/${product.id}`}>
                    <FaEye className="text-xl cursor-pointer" />
                  </Link>
                </div>
              </div>
              <div className="flex justify-center items-center mt-4 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-contain"
                />
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full bg-black text-white py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Add to Cart
              </button>
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-red-500 font-bold">
                  ${product.price.toFixed(2)} {/* Format as currency */}
                </span>
              </div>
              <div className="mt-2 text-yellow-500">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
                <span className="text-gray-500">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewAllProducts;
