import React, { useState, useRef } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser"; // Import EmailJS
import Shope from "./images/Shope.jpeg";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const form = useRef(); // EmailJS ref

  const handleSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user);
        sendEmail(e); // Send email on successful signup
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // EmailJS function to send email
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_h3mbbzc", // Replace with your EmailJS service ID
        "template_87xar25", // Replace with your EmailJS template ID
        form.current,
        "C5v88PvPRCKcj-tg7" // Replace with your EmailJS user ID
      )
      .then(
        () => {
          console.log("Email sent successfully!");
        },
        (error) => {
          console.log("Failed to send email...", error.text);
        }
      );
  };

  const handleGoogleSignup = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("User signed in with Google:", user);
        sendEmail(); // Optional: Send email after Google signup
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="flex justify-between items-center h-full">
      <div className="mb-8 mt-5">
        <img src={Shope} alt="shope" className="w-[53vw] h-[97vh]" />
      </div>
      <form
        ref={form}
        onSubmit={handleSignup}
        className="bg-white p-6 rounded w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">Create an account</h2>
        <h1 className="mb-5">Enter your details below</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          name="name" // Add name attribute for EmailJS
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="border-b border-gray-300 p-2 mb-4 w-full"
          required
        />

        <input
          type="email"
          name="email" // Add name attribute for EmailJS
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border-b border-gray-300 p-2 mb-4 w-full"
          required
        />

        <input
          type="password"
          name="password" // Add name attribute for EmailJS
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border-b border-gray-300 p-2 mb-4 w-full"
          required
        />

        <button
          type="submit"
          className="bg-red-500 text-white p-2 rounded w-28 hover:bg-red-600"
        >
          Sign up
        </button>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="mt-4 bg-blue-500 text-white p-2 rounded w-full flex justify-center items-center gap-2 hover:bg-blue-600"
        >
          <FaGoogle /> Sign up with Google
        </button>
      </form>
    </div>
  );
};

export default Signup;
