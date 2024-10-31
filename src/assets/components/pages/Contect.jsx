import React, { useState, useRef } from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const form = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_35hnsf5",
        "template_c6i07eg",
        form.current,
        "C5v88PvPRCKcj-tg7"
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message) newErrors.message = "Message is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      sendEmail(e); // Call sendEmail function when validation is successful
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "", message: "", phone: "" });
      setErrors({});
    }
  };

  return (
    <div className="mt-10 mx-auto bg-white justify-center gap-9 rounded-md flex">
      {/* Left Side Details Box */}
      <div className="w-72 p-8 bg-white shadow-md rounded-md">
        <h3 className="text-xl font-bold mb-4">Our Contact Details</h3>
        <div className="mb-4">
          <div className="flex items-start flex-col mb-2">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-full text-red-600 mr-3">
                <FaPhoneAlt />
              </div>
              <p className="font-bold">Phone:</p>
            </div>
            <div className="mt-5">
              <p>We are available 24/7, 7 days a week.</p>
              <p className="text-sm text-gray-600">Phone: +8801611112222</p>
            </div>
          </div>
          <hr className="border-gray-300 my-4" />
          <div className="flex items-start flex-col">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-full text-red-600 mr-3">
                <FaEnvelope />
              </div>
              <p className="font-bold">Email:</p>
            </div>
            <div className="mt-4">
              <p>customer@exclusive.com</p>
              <p>info@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Contact Form */}
      <div className="w-[770px] bg-white shadow-xl rounded-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
        <form ref={form} onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="mb-4 w-1/3 relative">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder-secondary"
              />
              <span className="absolute text-red-500 top-1/2 right-2 transform -translate-y-1/2">
                *
              </span>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div className="mb-4 w-1/3 relative">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder-secondary"
              />
              <span className="absolute text-red-500 top-1/2 right-2 transform -translate-y-1/2">
                *
              </span>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="mb-4 w-1/3 relative">
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder-secondary"
              />
              <span className="absolute text-red-500 top-1/2 right-2 transform -translate-y-1/2">
                *
              </span>
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="mb-4 relative">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Your message *"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md placeholder-secondary"
              rows="4"
            ></textarea>
            <span className="absolute text-red-500 top-0 right-2 transform -translate-y-1/2">
              *
            </span>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
