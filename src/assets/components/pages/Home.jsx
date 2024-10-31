import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "./images/apple logo.png";
import hero from "./images/hero.png";
import { FaArrowRight } from "react-icons/fa";
import FlashSales from "./FlashSales";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: true,
  };

  return (
    <>
      <div className="flex gap-14 pt-0 p-14 ml-2">
        <div className="w-[20%] bg-white border-r border-gray-200 p-4">
          <ul className="space-y-2">
            {[
              "Women's Fashion",
              "Men's Fashion",
              "Electronics",
              "Home & Lifestyle",
              "Medicine",
              "Sports & Outdoor",
              "Baby's & Toys",
              "Groceries & Pets",
              "Health & Beauty",
            ].map((category) => (
              <li
                key={category}
                className="flex justify-between items-center cursor-pointer"
              >
                <span>{category}</span>
                <FaArrowRight />
              </li>
            ))}
          </ul>
        </div>

        <div className="w-[70%] ml-4  mt-3">
          <Slider {...settings}>
            {[...Array(5)].map((_, index) => (
              <div key={index}>
                <div className="flex bg-black w-[64vw] h-[50vh]">
                  <div className="text-white w-[30vw] flex flex-col justify-around p-14">
                    <div className="flex items-center mb-3 gap-5">
                      <img className="h-10" src={logo} alt="Apple Logo" />
                      <h1 className="text-[13px]">iPhone 14 Series</h1>
                    </div>
                    <h1 className="text-4xl mt-4 font-semibold">
                      Up to 10% off Voucher
                    </h1>
                    <div className="flex items-center mt-5 cursor-pointer">
                      <h1 className="text-lg underline font-semibold">
                        Shop Now
                      </h1>
                      <FaArrowRight className="ml-2" />
                    </div>
                  </div>
                  <div className="w-[30vw] flex justify-center items-center">
                    <img
                      className="w-[20vw] h-[40vh]"
                      src={hero}
                      alt="iPhone 14 Series"
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div>
        <FlashSales />
      </div>
    </>
  );
};

export default Home;
