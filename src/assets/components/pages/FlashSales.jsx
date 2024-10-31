import React, { useState, useEffect, useRef, useContext } from "react";
import { FaHeart, FaEye, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Category from "./Category";
import BestSellingProducts from "./BestSellingProducts";
import { CartContext } from "./CartContext"; // Import CartContext

import { Link } from "react-router-dom";
// import ProductDetails from "./ProductDetails";
const FlashSales = ({ favorites = {}, setFavorites = () => {} }) => {
  const { addToCart } = useContext(CartContext); // Use CartContext
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 5,
  });

  const [saleActive, setSaleActive] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);
  const scrollContainerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      setError("No internet connection. Please check your connection.");
      setLoading(false);
      return;
    }

    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        const fetchedProducts = response.data.products.slice(0, 10); // Limiting to 10 items for display
        const formattedProducts = fetchedProducts.map((product) => ({
          id: product.id,
          image: product.thumbnail,
          discount: `-${Math.floor(Math.random() * 50 + 10)}%`, // Random discount for display
          name: product.title,
          salePrice: (product.price * 0.8).toFixed(2), // Numeric sale price
          originalPrice: product.price.toFixed(2), // Numeric original price
          rating: product.rating,
          reviews: product.stock, // Example review count using stock
        }));
        setProducts(formattedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the products:", error);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, [isOnline]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days -= 1;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(interval);
          setSaleActive(false);
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = { ...prevFavorites };
      if (updatedFavorites[productId]) {
        delete updatedFavorites[productId];
      } else {
        updatedFavorites[productId] = true;
      }
      console.log("Updated favorites", updatedFavorites);
      return updatedFavorites;
    });
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = (product) => {
    // Add the product to the cart with quantity 1
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="p-20 pt-8">
      {!isOnline && (
        <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-4 text-center">
          No internet connection. Please check your connection.
        </div>
      )}
      <div className="flex mt-16 gap-2 mb-9">
        <div className="w-3 h-6 rounded-sm bg-red-500 mr-2"></div>
        <div>
          <h1 className="text-red-500">Today’s</h1>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-9">
          <h2 className="text-4xl font-bold">Flash Sales</h2>
          <div className="flex gap-3">
            {["days", "hours", "minutes", "seconds"].map((unit, index) => (
              <React.Fragment key={unit}>
                <div
                  className={`flex flex-col text-[10px] items-center cursor-pointer ${
                    selectedDay === unit ? "text-red-700" : ""
                  }`}
                  onClick={() => setSelectedDay(unit)}
                >
                  {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  <div className="text-4xl">{timeLeft[unit] || 0}</div>
                </div>
                {index < 3 && (
                  <div className="text-4xl flex items-center">:</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={scrollLeft}
            className="bg-gray-200 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={scrollRight}
            className="bg-gray-200 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      {loading && (
        <div className="flex gap-8 mt-9">
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
      )}
      {error && !loading && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <div
          ref={scrollContainerRef}
          className="flex gap-8 mt-9 overflow-x-scroll no-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-lg group relative min-w-[250px]"
            >
              <div className="flex justify-between">
                <span className="text-red-500 font-bold">
                  {saleActive ? product.discount : "Sale Ended"}
                </span>
                <div className="flex flex-col gap-2 text-gray-500">
                  <button onClick={() => toggleFavorite(product.id)}>
                    <FaHeart
                      style={{
                        color: favorites[product.id] ? "red" : "gray",
                      }}
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
                  className="h-40 object-contain"
                />
              </div>
              <button
                onClick={() => handleAddToCart(product)} // Pass the product to handleAddToCart
                className="mt-4 w-full bg-black text-white py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Add to Cart
              </button>
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>

              <div className="flex justify-between items-center mt-2">
                {saleActive ? (
                  <>
                    <span className="text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                    <span className="text-red-500 font-semibold">
                      {product.salePrice}
                    </span>
                  </>
                ) : (
                  <span className="text-black font-bold">
                    {product.originalPrice}
                  </span>
                )}
              </div>

              <div className="text-gray-500">
                <span>{product.rating} stars</span> |{" "}
                <span>{product.reviews} reviews</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <Category />
      <BestSellingProducts />
      {/* <ProductDetails /> */}
    </div>
  );
};

export default FlashSales;
