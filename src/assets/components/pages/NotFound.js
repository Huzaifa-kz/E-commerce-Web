import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <Link to="/" className="mt-6 text-red-500 text-xl hover:underline">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
