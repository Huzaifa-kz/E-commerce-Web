import React from "react";
import {
  FaShippingFast,
  FaHeadset,
  FaUndoAlt,
  FaUsers,
  FaBoxOpen,
  FaSmile,
} from "react-icons/fa";
import shoping from "./images/shoping.png";
import man1 from "./images/Frame 6.png";
import man2 from "./images/Frame 7.png";
import man3 from "./images/Frame 8.png";

function About() {
  return (
    <div>
      <div className="container mx-auto  px-20 py-12">
        {/* Our Story Section */}
        <section className="flex mb-12">
          <div className="mt-36">
            <h1 className="text-4xl font-bold mb-6">Our Story</h1>
            <p className="text-gray-600 text-lg w-[40vw] leading-relaxed">
              Founded in 2018, Exclusive is South Africa’s premier online
              shopping destination for fashion and beauty products. Our goal is
              to bring you the latest and most stylish products with convenience
              and affordability.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mt-4">
              From fashion icons to modern fashion products, we offer something
              for everyone.
            </p>
          </div>
          <div className="mt-8">
            <img
              src={shoping}
              alt=""
              className="mx-auto shadow-lg w-[50vw] ml-20"
            />
          </div>
        </section>

        <section className="flex justify-center items-center mt-32 gap-8 mb-12">
          {/* Seller Stats */}
          <div className="text-center bg-white shadow-lg rounded-lg p-6 w-[22vw] hover:bg-red-500 hover:text-white transition-all duration-300">
            <div className="bg-black p-4 rounded-full mb-4 mx-auto text-white w-16 h-16 flex items-center justify-center">
              <FaUsers className="text-3xl" />{" "}
              {/* Icon size adjusted and centered */}
            </div>
            <h1 className="text-3xl font-bold">10.5k</h1>{" "}
            {/* Counter size adjusted */}
            <p className="text-gray-500">Sellers active on our site</p>
          </div>

          {/* Monthly Sales Stats */}
          <div className="text-center bg-white shadow-lg rounded-lg p-6 w-[22vw] hover:bg-red-500 hover:text-white transition-all duration-300">
            <div className="bg-black p-4 rounded-full mb-4 mx-auto text-white w-16 h-16 flex items-center justify-center">
              <FaBoxOpen className="text-3xl" /> {/* Adjusted size */}
            </div>
            <h1 className="text-3xl font-bold">33k</h1>
            <p className="text-gray-500">Monthly Product Sale</p>
          </div>

          {/* Customer Satisfaction */}
          <div className="text-center bg-white shadow-lg rounded-lg p-6 w-[22vw] hover:bg-red-500 hover:text-white transition-all duration-300">
            <div className="bg-black p-4 rounded-full mb-4 mx-auto text-white w-16 h-16 flex items-center justify-center">
              <FaSmile className="text-3xl" /> {/* Adjusted size */}
            </div>
            <h1 className="text-3xl font-bold">45.5k</h1>
            <p className="text-gray-500">Customer satisfaction rate</p>
          </div>

          {/* Annual Sales */}
          <div className="text-center bg-white shadow-lg rounded-lg p-6 w-[22vw] hover:bg-red-500 hover:text-white transition-all duration-300">
            <div className="bg-black p-5 rounded-full mb-4 mx-auto text-white w-16 h-16 flex items-center justify-center">
              <FaUsers className="text-3xl" /> {/* Adjusted size */}
            </div>
            <h1 className="text-3xl font-bold">25k</h1>
            <p className="text-gray-500">Annual gross sales</p>
          </div>
        </section>

        {/* Team Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 mt-28 gap-8">
          <div className="  p-6 hover:shadow-xl  transition-shadow duration-300">
            <img
              src={man1}
              alt="Tom Cruise"
              className="w-full h-80 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold">Tom Cruise</h2>
            <p className="text-gray-600">Founder & CEO</p>
          </div>

          <div className="  p-6 hover:shadow-xl transition-shadow duration-300">
            <img
              src={man2}
              alt="Emma Watson"
              className="w-full h-72 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold">Emma Watson</h2>
            <p className="text-gray-600">Managing Director</p>
          </div>

          <div className="  p-6 hover:shadow-xl transition-shadow duration-300">
            <img
              src={man3}
              alt="Will Smith"
              className="w-full h-72 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold">Will Smith</h2>
            <p className="text-gray-600">Product Designer</p>
          </div>
        </section>

        {/* Bottom Features Section */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3  gap-8 text-center">
          <div className="p-6 flex flex-col items-center border-gray-300 rounded-lg hover:bg-gray-100 hover:text-red-500 transition-all duration-300">
            <div className="bg-black p-4 rounded-full mb-4">
              <FaShippingFast className="text-4xl text-white" />
            </div>
            <h3 className="text-xl font-bold">Free and Fast Delivery</h3>
            <p className="text-gray-600">Across all countries</p>
          </div>
          <div className="p-6 flex flex-col items-center border-gray-300 rounded-lg hover:bg-gray-100 hover:text-red-500 transition-all duration-300">
            <div className="bg-gray-800 p-4 rounded-full mb-4">
              <FaHeadset className="text-4xl text-white" />
            </div>
            <h3 className="text-xl font-bold">24/7 Customer Service</h3>
            <p className="text-gray-600">Always ready to help</p>
          </div>
          <div className="p-6 flex flex-col items-center border-gray-300 rounded-lg hover:bg-gray-100 hover:text-red-500 transition-all duration-300">
            <div className="bg-black p-4 rounded-full mb-4">
              <FaUndoAlt className="text-4xl text-white" />
            </div>
            <h3 className="text-xl font-bold">Money Back Guarantee</h3>
            <p className="text-gray-600">If you're not satisfied</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
