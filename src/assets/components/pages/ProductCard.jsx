// import React from "react";
// import { Link } from "react-router-dom";
// import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";

// const ProductCard = ({ product }) => {
//   // Ensure the product object exists, if not, return early or render a fallback UI
//   if (!product) {
//     return <div>Product information is not available.</div>;
//   }

//   return (
//     <div className="p-4 border rounded-lg shadow-lg">
//       {/* Safe check for image and fallback if not available */}
//       <img
//         className="w-full h-48 object-cover"
//         src={product.image || "path-to-default-image.jpg"} // Fallback to default image if undefined
//         alt={product.name || "Unknown Product"} // Fallback alt text
//       />

//       {/* Product name with a fallback value */}
//       <h3 className="text-lg font-semibold">
//         {product.name || "Product Name Unavailable"}
//       </h3>

//       {/* Price with a fallback message */}
//       <p className="text-gray-600">
//         {product.price ? `$${product.price}` : "Price unavailable"}
//       </p>

//       {/* Icons for adding to favorites and viewing details */}
//       <div className="flex space-x-4 mt-4">
//         <AiOutlineHeart className="text-2xl cursor-pointer" />

//         {/* Navigate to ProductDetails with product ID if available */}
//         <Link to={`/product/${product.id}`}>
//           <AiOutlineEye className="text-2xl cursor-pointer" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
