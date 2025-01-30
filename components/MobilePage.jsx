import React, { useState, useEffect } from "react";

const MobilePage = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500); // Loops every 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-gray-800"
      style={{ animation: "fadeIn 1s ease-in-out" }}
    >
      <div className="flex flex-col items-center">
        <h1
          className="text-6xl font-bold text-transparent bg-clip-text leading-none"
          style={{
            backgroundImage: "linear-gradient(to right, #00c6ff, #0072ff)",
            animation: "pulse 2s infinite",
          }}
        >
          Launching Our App Soon
        </h1>
        <span
          className="text-6xl font-bold text-white"
          style={{
            animation: "blink 1s infinite",
            minWidth: "3ch", // Increased min-width for better spacing
            display: "inline-block",
            marginLeft: "15px",
          }}
        >
          {dots}
        </span>
      </div>

      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default MobilePage;
