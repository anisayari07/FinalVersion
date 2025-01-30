import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import routing components
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, VersionedTransaction } from '@solana/web3.js';
import { fetchTokens, fetchQuote, fetchSwapTransaction } from './utils/api';
import { ConnectWallet } from './components/ConnectWallet';
import { TokenSelector } from './components/TokenSelector';
import { ExecuteSwap } from './components/ExecuteSwap';
import { Navbar } from './components/Navbar';
import { SwapTabs } from './components/SwapTabs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateAmount } from './utils/validation';
import { fetchUserTokenBalance } from './utils/fetchUserTokenBalance';
import TradingViewWidget from './components/TradingViewWidget';
import MobilePage from './components/MobilePage'; // Import MobilePage
import OurCoinPage from './components/OurCoinPage'; // Import OurCoinPage

function App() {
  const [activeTab, setActiveTab] = useState('Spot');
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [sellToken, setSellToken] = useState('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); // Default: USDC
  const [buyToken, setBuyToken] = useState('So11111111111111111111111111111111111111112'); // Default: SOL
  const [tokens, setTokens] = useState([]);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [slippage, setSlippage] = useState(0.5); // Default slippage: 0.5%
  const [userBalance, setUserBalance] = useState(0);
  const [buyTokenBalance, setBuyTokenBalance] = useState(0);

  const { connected, publicKey, connect } = useWallet();

  // Fetch tokens on component mount
  useEffect(() => {
    const fetchTokensData = async () => {
      try {
        const tokensData = await fetchTokens();
        setTokens(tokensData);
      } catch (error) {
        toast.error('Failed to fetch tokens. Please try again.');
      }
    };
    fetchTokensData();
  }, []);

  // Fetch user balances for sell and buy tokens
  useEffect(() => {
    const fetchBalances = async () => {
      if (connected && publicKey) {
        try {
          const sellBalance = await fetchUserTokenBalance(publicKey, sellToken);
          const buyBalance = await fetchUserTokenBalance(publicKey, buyToken);
          setUserBalance(sellBalance);
          setBuyTokenBalance(buyBalance);
        } catch (error) {
          toast.error('Failed to fetch balances. Please try again.');
        }
      }
    };
    fetchBalances();
  }, [connected, publicKey, sellToken, buyToken]);

  // Debounced fetch quote
  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (!sellToken || !buyToken || !sellAmount || !validateAmount(sellAmount)) {
        setQuote(null); // Reset quote if inputs are invalid
        return;
      }

      const sellTokenInfo = tokens.find((token) => token.address === sellToken);
      if (!sellTokenInfo) return;

      const sellAmountSmallestUnit = sellAmount * Math.pow(10, sellTokenInfo.decimals);

      try {
        const quoteData = await fetchQuote(sellToken, buyToken, sellAmountSmallestUnit, slippage * 100);
        setQuote(quoteData);

        const buyTokenInfo = tokens.find((token) => token.address === buyToken);
        if (buyTokenInfo) {
          const outAmountHumanReadable = quoteData.outAmount / Math.pow(10, buyTokenInfo.decimals);
          setBuyAmount(outAmountHumanReadable.toFixed(buyTokenInfo.decimals));
        }
      } catch (error) {
        toast.error('Failed to fetch quote. Please try again.');
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(debounceTimer);
  }, [sellToken, buyToken, sellAmount, tokens, slippage]);

  // Reset amount when wallet is disconnected
  useEffect(() => {
    if (!connected) {
      setSellAmount('');
      setBuyAmount('');
    }
  }, [connected]);

  // Determine "Swap" button text and state
  const getSwapButtonText = () => {
    if (!connected) return 'Connect Wallet';
    if (!sellAmount) return 'Enter Amount';
    return loading ? 'Swapping...' : 'Swap';
  };

  const isSwapButtonDisabled = () => {
    return !connected || !sellAmount || !quote || loading;
  };

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Routes>
          {/* Spot Page */}
          <Route
            path="/"
            element={
              <div className="flex flex-1 p-5 justify-center items-center gap-2">
                <div className="flex justify-center">
                  <TradingViewWidget symbol="COINBASE:SOLUSDC" />
                </div>
                <div className="bg-gray-800 bg-opacity-20 rounded-lg p-5" style={{ width: "350px" }}>
                  <SwapTabs activeSwapTab={activeTab} setActiveSwapTab={setActiveTab} />
                  <TokenSelector
                    tokens={tokens}
                    token={sellToken}
                    setToken={setSellToken}
                    amount={sellAmount}
                    setAmount={setSellAmount}
                    label="You're Selling"
                    userBalance={userBalance}
                    isReadOnly={false}
                  />
                  <div className="flex justify-center my-2">
                    <button className="bg-gray-700 bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center">
                      <span className="text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5m-4.5-4.5v13.5m6-1.5L16.5 21m0 0L21 16.5m-4.5 4.5V7.5" />
                        </svg>
                      </span>
                    </button>
                  </div>
                  <TokenSelector
                    tokens={tokens}
                    token={buyToken}
                    setToken={setBuyToken}
                    amount={buyAmount}
                    setAmount={setBuyAmount}
                    label="You're Buying"
                    userBalance={buyTokenBalance}
                    isReadOnly={true}
                  />
                  <div className="bg-gray-700 bg-opacity-20 p-3 rounded-lg mt-5 text-center">
                    <ExecuteSwap
                      quote={quote}
                      sellAmount={sellAmount}
                      setLoading={setLoading}
                      getSwapButtonText={getSwapButtonText}
                      isSwapButtonDisabled={isSwapButtonDisabled}
                      onConnectWallet={connect}
                    />
                  </div>
                </div>
              </div>
            }
          />
          {/* Mobile Page */}
          <Route path="/mobile" element={<MobilePage />} />
          {/* Our Coin Page */}
          <Route path="/our-coin" element={<OurCoinPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;