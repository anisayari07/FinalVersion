import { useState } from 'react';

export const SwapTabs = () => {
  // Set the default active tab to "Auto"
  const [activeSwapTab, setActiveSwapTab] = useState('Auto');

  return (
    <div className="flex justify-center gap-4 mb-6">
      {['Auto', 'Manual', 'DCA'].map((tab) => (
        <button
          key={tab}
          className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeSwapTab === tab
              ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg shadow-blue-500/30'
              : 'bg-gray-700 bg-opacity-50 text-gray-300 hover:bg-gray-600 hover:text-white'
          }`}
          onClick={() => setActiveSwapTab(tab)}
        >
          {tab}
          {/* Add a subtle glow effect for the active tab */}
          {activeSwapTab === tab && (
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 opacity-20 animate-pulse"></span>
          )}
        </button>
      ))}
    </div>
  );
};