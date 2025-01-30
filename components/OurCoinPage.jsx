import React from "react";
import { FaXTwitter } from "react-icons/fa6"; // Import Twitter (X) logo

const OurCoinPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <a
        href="https://twitter.com/your-x-account" // Replace with your X (Twitter) link
        target="_blank"
        rel="noopener noreferrer"
        className="text-6xl text-white transition-transform transform hover:scale-110"
      >
        <FaXTwitter />
      </a>
    </div>
  );
};

export default OurCoinPage;
