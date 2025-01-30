export const fetchPriceData = async (coinId) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`
      );
      const data = await response.json();
  
      // Sort and deduplicate the data
      const uniqueData = [];
      const seenTimestamps = new Set();
  
      data.prices
        .sort((a, b) => a[0] - b[0]) // Sort by timestamp
        .forEach(([timestamp, price]) => {
          if (!seenTimestamps.has(timestamp)) {
            seenTimestamps.add(timestamp);
            uniqueData.push({
              time: Math.floor(timestamp / 1000), // Convert to Unix timestamp
              value: price,
            });
          }
        });
  
      return uniqueData;
    } catch (error) {
      console.error('Error fetching price data:', error);
      return [];
    }
  };