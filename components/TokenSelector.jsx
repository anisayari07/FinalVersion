import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

export const TokenSelector = ({ tokens, token, setToken, amount, setAmount, label, userBalance, isReadOnly }) => {
  const [isTabOpen, setIsTabOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isTabOpen) {
      document.body.classList.add('blur-background');
    } else {
      document.body.classList.remove('blur-background');
    }
    return () => {
      document.body.classList.remove('blur-background');
    };
  }, [isTabOpen]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleMaxClick = () => {
    setAmount(userBalance);
  };

  const handleTokenSelect = (selectedToken) => {
    setToken(selectedToken);
    setIsTabOpen(false);
  };

  const filteredTokens = tokens.filter((t) => t.address.includes(searchQuery));

  const selectedToken = tokens.find(t => t.address === token);

  return (
    <div className="bg-gray-900 bg-opacity-20 p-4 rounded-lg mb-4" style={{ minHeight: '140px', position: 'relative' }}>
      <h3 className="mb-2 text-lg font-semibold text-white">{label}</h3>
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setIsTabOpen(true)}
          className="bg-white bg-opacity-10 text-white p-2 rounded-md flex items-center justify-between w-1/3 relative overflow-hidden transition-all duration-300 hover:border-white hover:shadow-lg"
        >
          {selectedToken ? (
            <div className="flex items-center">
              <img
                src={selectedToken.logoURI}
                alt={`${selectedToken.symbol} logo`}
                className="inline-block w-6 h-6 mr-2 rounded-full"
              />
              <span>{selectedToken.symbol}</span>
            </div>
          ) : (
            <span>Select Token</span>
          )}
          <span className="absolute inset-0 border border-transparent rounded-md transition-all duration-300 hover:border-white"></span>
        </button>
        <input
          type="text"
          placeholder="0.00"
          value={amount}
          onChange={handleAmountChange}
          className="text-white text-right bg-transparent p-2 w-2/3 focus:outline-none"
          readOnly={isReadOnly}
        />
      </div>
      {isTabOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setIsTabOpen(false)}
        >
          <div
            style={{ width: '430px', height: '600px' }}
            className="bg-gray-800 bg-opacity-90 text-white p-4 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Search by address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 bg-opacity-20 text-white p-1 rounded-md w-full mb-2"
            />
            <ul className="overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(100% - 40px)' }}>
              {filteredTokens.map((token) => (
                <li
                  key={token.address}
                  onClick={() => handleTokenSelect(token.address)}
                  className="flex items-center p-3 mb-2 hover:bg-gray-700 cursor-pointer transition-all duration-200 ease-in-out"
                >
                  <img
                    src={token.logoURI}
                    alt={`${token.symbol} logo`}
                    className="inline-block w-8 h-8 mr-3 rounded-full"
                  />
                  {token.symbol}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <p className="text-sm text-gray-400 absolute bottom-2 left-4">
        <FontAwesomeIcon icon={faWallet} className="mr-1" />
        Balance: {userBalance}
      </p>
    </div>
  );
};

export default TokenSelector;