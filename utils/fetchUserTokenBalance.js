import { Connection, PublicKey } from '@solana/web3.js';
import { toast } from 'react-toastify';

export const fetchUserTokenBalance = async (publicKey, tokenAddress) => {
  const quickNodeEndpoint = 'https://lively-green-patina.solana-mainnet.quiknode.pro/6b1d94cc2eb30995b0fe2bbbef79a2b8c757adfb'; // Your QuickNode endpoint

  try {
    const connection = new Connection(quickNodeEndpoint);

    // Fetch token accounts owned by the user for the specific token
    const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
      mint: new PublicKey(tokenAddress),
    });

    // If the user has a token account for this token, fetch the balance
    if (tokenAccounts.value.length > 0) {
      const balance = await connection.getTokenAccountBalance(tokenAccounts.value[0].pubkey);
      return balance.value.uiAmount || 0; // Return the balance in a human-readable format
    }

    // If no token account is found, return 0
    return 0;
  } catch (error) {
    console.error('Error fetching token balance:', error);
    toast.error('Failed to fetch token balance. Please try again.');
    return 0;
  }
};