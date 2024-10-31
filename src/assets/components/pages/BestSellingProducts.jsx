import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaHeart, FaEye } from "react-icons/fa";
import Boombox from "./images/BOOMBOX2.png";
import Products from "./Products";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
const BestSellingProducts = ({ favorites = {}, setFavorites = () => {} }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewAll, setViewAll] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1, salePrice: product.price }); // Ensure salePrice is set
  };

  useEffect(() => {
    if (!isOnline) {
      setLoading(false);
      return;
    }

    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        const fetchedProducts = response.data.products.slice(0, 18);
        const formattedProducts = fetchedProducts.map((product) => ({
          id: product.id,
          image: product.thumbnail,
          name: product.title,
          price: product.price, // Price remains consistent
          rating: product.rating,
          reviews: product.stock,
        }));
        setProducts(formattedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the products:", error);
        setLoading(false);
      });
  }, [isOnline]);

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = { ...prevFavorites };
      if (updatedFavorites[productId]) {
        delete updatedFavorites[productId];
      } else {
        updatedFavorites[productId] = true;
      }
      return updatedFavorites;
    });
  };

  return (
    <div>
      {!isOnline && (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-4 text-center">
          No internet connection. Please check your connection.
        </div>
      )}
      <div className="flex mt-10 gap-2 mb-9 items-center">
        <div className="w-3 h-6 bg-red-500 rounded-sm mr-2"></div>
        <h1 className="text-red-500">This Month</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-bold">Best Selling Products</h2>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          onClick={() => setViewAll(!viewAll)}
        >
          {viewAll ? "Show Less" : "View All"}
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
        <div className="relative">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-9 ${
              viewAll ? "grid-rows-auto" : "grid-rows-1"
            }`}
          >
            {products.slice(0, viewAll ? products.length : 4).map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg shadow-lg group relative"
              >
                <div className="flex justify-end">
                  <div className="flex flex-col gap-2 text-gray-500">
                    <button onClick={() => toggleFavorite(product.id)}>
                      <FaHeart
                        className={`${
                          favorites[product.id]
                            ? "text-red-500"
                            : "text-gray-500"
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
        </div>
      )}
      <div className="flex items-center justify-between bg-black mt-32 text-white p-10">
        <div>
          <h1 className="text-green-500 font-bold text-xl mb-2">Categories</h1>
          <h1 className="text-5xl mb-6">Enhance Your Music Experience</h1>
          {/* Timer */}
          <div className="flex gap-4">
            <div className="bg-white text-black rounded-full w-20 h-20 flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">23</h1>
              <p className="text-sm">Hours</p>
            </div>
            <div className="bg-white text-black rounded-full w-20 h-20 flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold">05</h1>
              <p className="text-sm">Days</p>
            </div>
          </div>
          <button className="bg-green-500 text-white mt-11 py-2 px-6 rounded hover:bg-green-600">
            Buy Now!
          </button>
        </div>
        <img src={Boombox} alt="BoomBox" className="h-64" />
      </div>
      <Products />
    </div>
  );
};

export default BestSellingProducts;
