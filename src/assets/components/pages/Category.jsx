import React, { useRef } from "react";
import {
  FiSmartphone,
  FiMonitor,
  FiCamera,
  FiHeadphones,
  FiCpu,
} from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categories = [
  { id: 1, name: "Phones", icon: <FiSmartphone /> },
  { id: 2, name: "Computers", icon: <FiMonitor /> },
  { id: 3, name: "SmartWatch", icon: <FiCpu /> },
  { id: 4, name: "Camera", icon: <FiCamera /> },
  { id: 5, name: "HeadPhones", icon: <FiHeadphones /> },
  { id: 6, name: "Tablets", icon: <FiMonitor /> },
  { id: 7, name: "Gaming", icon: <FiCpu /> },
  { id: 8, name: "Laptops", icon: <FiMonitor /> },
  { id: 9, name: "Smart TVs", icon: <FiMonitor /> },
  { id: 10, name: "Accessories", icon: <FiHeadphones /> },
];

const Category = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="py-10 relative">
      <div className="flex  gap-2 mb-9">
        <div className="w-3 h-6 rounded-sm bg-red-500 mr-2"></div>
        <div>
          <h1 className="text-red-500">Categories</h1>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-black flex justify-between">
        Browse By Category
        <div className="flex items-center gap-4">
          <button
            onClick={() => scroll("left")}
            className="bg-gray-200 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-gray-200 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
          >
            <FaChevronRight />
          </button>
        </div>
      </h2>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-6"
        style={{ scrollBehavior: "smooth" }}
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex-shrink-0 w-1/6 flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg hover:bg-red-500 transition-colors"
            style={{ minWidth: "160px" }}
          >
            <div className="text-4xl text-gray-600 hover:text-red-100 transition-colors">
              {category.icon}
            </div>
            <p className="mt-2 text-gray-700">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
