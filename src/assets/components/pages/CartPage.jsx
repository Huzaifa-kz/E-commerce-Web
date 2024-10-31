import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [generatedCoupons, setGeneratedCoupons] = useState({});

  const specialCoupons = ["HUZAIFA", "ALI", "KHAN", "WAB", "OFF"];

  const generateCouponCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let couponCode = "";
    for (let i = 0; i < 8; i++) {
      couponCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return couponCode;
  };

  const generateAndStoreCoupon = () => {
    const newCoupon = generateCouponCode();
    const discountValue = 25;
    const storedCoupons = JSON.parse(localStorage.getItem("coupons")) || {};
    storedCoupons[newCoupon] = discountValue;
    localStorage.setItem("coupons", JSON.stringify(storedCoupons));
    setGeneratedCoupons(storedCoupons);
    console.log(
      "New Coupon Generated:",
      newCoupon,
      "with",
      discountValue,
      "% discount"
    );
  };

  useEffect(() => {
    const savedCoupons = JSON.parse(localStorage.getItem("coupons")) || {};
    setGeneratedCoupons(savedCoupons);
  }, []);

  const calculateSubtotal = (price, quantity) => {
    const validPrice = parseFloat(price) || 0;
    const validQuantity = quantity || 0;
    return validPrice * validQuantity;
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + calculateSubtotal(item.salePrice, item.quantity),
      0
    );
    return total - (total * discount) / 100;
  };

  const handleApplyCoupon = () => {
    const upperCaseCoupon = couponCode.toUpperCase();
    if (specialCoupons.includes(upperCaseCoupon)) {
      setDiscount(50);
      setError("");
    } else if (generatedCoupons[upperCaseCoupon]) {
      setDiscount(generatedCoupons[upperCaseCoupon]);
      setError("");
    } else {
      setDiscount(0);
      setError("Invalid coupon code.");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mt-5"
              >
                <div className="flex items-center">
                  <img className="w-20" src={item.image} alt={item.name} />
                  <span className="ml-4 font-semibold">{item.name}</span>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="mx-4 w-16 text-center border"
                  />
                  <span className="font-semibold text-sm mr-8">
                    ${parseFloat(item.salePrice).toFixed(2)}
                  </span>
                  <span className="font-semibold text-sm">
                    $
                    {calculateSubtotal(item.salePrice, item.quantity).toFixed(
                      2
                    )}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 ml-6"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-5 text-center font-semibold">Your cart is empty</p>
          )}

          <div className="mt-10">
            <a
              href="/"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              Continue Shopping
            </a>
          </div>
        </div>

        <div className="w-1/4 bg-gray-100 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Subtotal</span>
            <span className="font-semibold text-sm">
              $
              {cartItems
                .reduce(
                  (acc, item) =>
                    acc + calculateSubtotal(item.salePrice, item.quantity),
                  0
                )
                .toFixed(2)}
            </span>
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter Coupon Code"
              className="border px-4 py-2 mr-4 w-full"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-red-500 text-white py-2 px-4 mt-2 w-full rounded-md"
            >
              Apply Coupon
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {discount > 0 && (
              <p className="text-green-600 mt-2">
                Coupon applied! {discount}% off.
              </p>
            )}
          </div>

          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Total</span>
            <span className="font-semibold text-sm">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>

          <button
            onClick={generateAndStoreCoupon}
            className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full mb-4"
          >
            Generate New Coupon
          </button>

          <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
