import React, { useEffect, useRef } from 'react';

function TradingViewWidget({ symbol = "COINBASE:SOLUSDC" }) {
  const container = useRef(null);

  useEffect(() => {
    // Ensure the container element exists before proceeding
    if (!container.current) return;

    // Create a new script element
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    // Define the script's inner HTML (TradingView configuration)
    script.innerHTML = JSON.stringify({
      autosize: false, // Disable autosize to set custom dimensions
      width: "900", // Set width to 900px
      height: "500", // Set height to 500px
      symbol: symbol, // Dynamic symbol
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark", // Fixed dark theme
      style: "1",
      locale: "en",
      hide_side_toolbar: false, // Enable drawing tools
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });

    // Append the script to the container
    container.current.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (container.current && script.parentNode === container.current) {
        container.current.removeChild(script);
      }
    };
  }, [symbol]); // Re-run effect only when the symbol changes

  return (
    <div 
      className="tradingview-widget-container rounded-lg overflow-hidden" 
      ref={container} 
      style={{ height: "500px", width: "900px", maxWidth: "100%" }} // Fixed dimensions with maxWidth for responsiveness
    >
      <div 
        className="tradingview-widget-container__widget" 
        style={{ height: "100%", width: "100%" }} // Ensure the chart takes full height and width
      ></div>
    </div>
  );
}

export default React.memo(TradingViewWidget);