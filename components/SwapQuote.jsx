import { useState } from 'react';
import { fetchQuote } from '../utils/api';

export const SwapQuote = ({ sellToken, buyToken, sellAmount, setBuyAmount, setQuote }) => {
  const [loading, setLoading] = useState(false);

  const handleFetchQuote = async () => {
    if (!sellToken || !buyToken || !sellAmount) {
      alert('Please select tokens and enter an amount.');
      return;
    }

    setLoading(true);
    try {
      const quote = await fetchQuote(sellToken, buyToken, sellAmount);
      setQuote(quote);
      setBuyAmount(quote.outAmount);
    } catch (error) {
      console.error('Error fetching quote:', error);
      alert('Failed to fetch quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleFetchQuote}
      disabled={!sellAmount || !sellToken || !buyToken || loading}
      className="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-4 py-2 rounded-lg w-full mb-2"
    >
      {loading ? 'Fetching Quote...' : 'Get Quote'}
    </button>
  );
};