import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import apple from "./pages/images/apple.png";
import google from "./pages/images/google.png";
import Qr from "./pages/images/Qr.jpeg";
const Footer = () => {
  return (
    <footer className="bg-black text-white text-center p-20 pt-10 pb-9  mt-12">
      <div className="flex justify-between text-start">
        <div className="flex flex-col gap-4">
          <div className="mb-2 font-bold text-[15px]">Exclusive</div>
          <div>Subscribe</div>
          <div>
            <div>Get 10% off your first order</div>
            <div className="relative mt-3">
              <input
                type="text"
                className="p-2 rounded text-white bg-transparent border border-white placeholder-slate-300 pr-10"
                placeholder="Enter your email"
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="gap-4 flex flex-col">
          <div className="mb-2 font-bold text-[15px]">Support</div>
          <div className="w-48">
            111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh
          </div>
          <div>exclusive@gmail.com</div>
          <div>+88015-88888-9999</div>
        </div>
        <div className="gap-2 flex flex-col">
          <div className="mb-2 font-bold text-[15px]">Account</div>
          <div>My Account</div>
          <div>Login / Register</div>
          <div>Cart</div>
          <div>Wishlist</div>
          <div>Shop</div>
        </div>
        <div className="gap-2 flex flex-col">
          <div className="mb-2 font-bold text-[15px]">Quick Link</div>
          <div>Privacy Policy</div>
          <div>Terms Of Use</div>
          <div>FAQ</div>
          <div>Contact</div>
        </div>
        <div className="ml-9">
          <div className="mb-2 font-bold text-[15px]">Download App</div>
          <div className="text-gray-400 text-[13px] font-bold mt-4">
            Save $3 with App New User Only
          </div>
          <div className="flex gap-2 mt-3">
            <div>
              <img
                src={Qr}
                alt="Qr"
                className="w-[100px] h-auto border-2 border-white rounded"
              />
            </div>
            <div className="flex gap-4 mt-2 flex-col ">
              <a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={google}
                  alt="Google Play"
                  className="w-[100px] h-auto border-2 border-white rounded"
                />
              </a>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={apple}
                  alt="Apple Store"
                  className="w-[100px] h-auto border-2 border-white rounded"
                />
              </a>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
