import React from "react";

function Account() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className=" font-bold mb-6">Manage My Account</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Profile</h2>
          <p className="text-gray-600">
            Manage your personal details and settings.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Address Book</h2>
          <p className="text-gray-600">View and edit your saved addresses.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Payment Options</h2>
          <p className="text-gray-600">Manage your payment methods.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>
          <p className="text-gray-600">Track and view your past orders.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Returns</h2>
          <p className="text-gray-600">View and manage your return requests.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Cancellations</h2>
          <p className="text-gray-600">Review and manage canceled orders.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My WishList</h2>
          <p className="text-gray-600">View and manage your saved items.</p>
        </div>
      </div>
    </div>
  );
}

export default Account;
