import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "./CartContext";
import { useProduct } from "./ProductContext"; // Ensure this path is correct

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const productId = parseInt(id, 10); // Convert id to a number
  const product = useProduct(productId); // Get product based on the ID
  const [quantity, setQuantity] = useState(1); // Manage product quantity
  const { addToCart } = useContext(CartContext); // Use the CartContext here

  // Updated handleAddToCart to include the selected quantity
  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: 1,
      salePrice: product.price,
      image: product.thumbnail,
      name: product.title,
    });
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  // If product is not found, return a loading state or error message
  if (!product) {
    return <div className="text-center">Loading...</div>; // or <div>Product not found</div>
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        {/* Left side - images */}
        <div className="flex flex-col">
          <div className="flex flex-col">
            {product.images &&
              product.images.map((image, index) => (
                <div key={index}>
                  <img
                    className="mb-4 w-[100px] h-auto"
                    src={image}
                    alt={`${product.title} - angle ${index + 1}`}
                  />
                </div>
              ))}
          </div>

          <div>
            <img
              className="mb-4 w-[100px] h-auto"
              src={product.thumbnail}
              alt={product.title}
            />
          </div>
          <div>
            <img
              className="mb-4 w-[100px] h-auto"
              src={product.thumbnail}
              alt={product.title}
            />
          </div>
          <div>
            <img
              className="mb-4 w-[100px] h-auto"
              src={product.thumbnail}
              alt={product.title}
            />
          </div>
        </div>

        <div className="md:w-1/3 mb-6 md:mb-0">
          <img
            className="mb-4 w-full h-auto"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="md:w-2/3 pl-8">
          <h2 className="text-3xl font-semibold">{product.title}</h2>
          <p className="text-lg mt-2">
            Price: <span className="font-bold">${product.price}</span>
          </p>
          <p className="mt-2 text-green-600">In Stock</p>

          <div className="mt-4 flex items-center">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              -
            </button>
            <span className="mx-4 text-lg">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              +
            </button>
          </div>

          {/* Buy and Add to Cart Buttons */}
          <div className="mt-6 flex space-x-4">
            <button className="px-6 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600 transition duration-200">
              Buy Now
            </button>
            <button
              onClick={() => handleAddToCart(product)}
              className="px-6 py-2 bg-black text-white rounded shadow-md hover:bg-gray-800 transition duration-200"
            >
              Add to Cart
            </button>
          </div>

          {/* Free Delivery and Return Information */}
          <div className="mt-6">
            <p className="text-sm">Free Delivery</p>
            <p className="text-sm">Return Delivery: Free 30 days returns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
