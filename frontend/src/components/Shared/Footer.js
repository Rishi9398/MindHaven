import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-bold text-lg mb-4">Contact</h3>
          <p>Email: safespace@gmail.com</p>
          <p>Phone: +97165464416</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Subscribe</h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-l-md"
          />
          <button className="bg-blue-600 px-4 py-2 rounded-r-md">Join Now</button>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>Twitter</span>
          </div>
        </div>
      </div>
      <p className="text-center mt-6">© 2024 Safe Space. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
