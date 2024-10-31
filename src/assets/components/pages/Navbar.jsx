import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaRegHeart,
  FaRegUser,
  FaBox,
  FaTimes,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CartContext } from "./CartContext";
import { FavoritesContext } from "./FavoritesProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { cartItems } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const favoriteCount = Object.keys(favorites).length;

  return (
    <nav className="text-black gap-24 p-5 px-20 pt-6 bg-white border-b border-black">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          Exclusive
        </Link>
        <div className="flex gap-7">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          {!token ? (
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:underline text-red-500"
            >
              Logout
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              className="text-black p-1 pl-8 rounded"
              placeholder="Search..."
            />
            <FaSearch className="absolute right-[190px] top-2 text-black-400" />
          </div>
          {token && (
            <>
              <Link to="/favorites" className="relative">
                <FaRegHeart className="text-black" />
                {favoriteCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {favoriteCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative">
                <FiShoppingCart className="text-2xl text-black" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 left-4 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems?.reduce(
                      (total, item) => total + (item.quantity || 1),
                      0
                    )}
                  </span>
                )}
              </Link>
              <div className="relative">
                <FaRegUser
                  className="text-black cursor-pointer"
                  onClick={toggleProfileDropdown}
                />
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 z-10 w-48 backdrop-blur-xl bg-black opacity-80 text-white rounded-lg shadow-lg">
                    <Link
                      to="/account"
                      className="px-4 py-2 hover:bg-red-500 flex items-center gap-2"
                    >
                      <FaRegUser /> My Account
                    </Link>
                    <Link
                      to="/orders"
                      className="px-4 py-2 hover:bg-red-500 flex items-center gap-2"
                    >
                      <FaBox /> My Orders
                    </Link>
                    <Link
                      to="/cancellations"
                      className="px-4 py-2 hover:bg-red-500 flex items-center gap-2"
                    >
                      <FaTimes /> My Cancellations
                    </Link>
                    <Link
                      to="/reviews"
                      className="px-4 py-2 hover:bg-red-500 flex items-center gap-2"
                    >
                      <FaStar /> My Reviews
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 w-full text-left hover:bg-red-500 flex items-center gap-2"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
