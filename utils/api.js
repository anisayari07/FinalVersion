const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export const fetchTokens = async () => {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const response = await fetch('https://token.jup.ag/strict');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching tokens, retrying... (${retries + 1}/${MAX_RETRIES})`, error);
      retries++;
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }
  throw new Error('Failed to fetch tokens after maximum retries');
};

export const fetchQuote = async (sellToken, buyToken, sellAmount, slippageBps = 50) => {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const response = await fetch(
        `https://quote-api.jup.ag/v6/quote?inputMint=${sellToken}&outputMint=${buyToken}&amount=${sellAmount}&slippageBps=${slippageBps}`
      );
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching quote, retrying... (${retries + 1}/${MAX_RETRIES})`, error);
      retries++;
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }
  throw new Error('Failed to fetch quote after maximum retries');
};

export const fetchSwapTransaction = async (quote, publicKey) => {
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const response = await fetch('https://quote-api.jup.ag/v6/swap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quoteResponse: quote,
          userPublicKey: publicKey.toBase58(),
          wrapAndUnwrapSol: true,
        }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      return data.swapTransaction; // Return the base64-encoded transaction
    } catch (error) {
      console.error(`Error fetching swap transaction, retrying... (${retries + 1}/${MAX_RETRIES})`, error);
      retries++;
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }
  throw new Error('Failed to fetch swap transaction after maximum retries');
};