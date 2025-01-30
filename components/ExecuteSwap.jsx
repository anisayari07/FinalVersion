import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, VersionedTransaction } from '@solana/web3.js';
import { fetchSwapTransaction } from '../utils/api';
import { toast } from 'react-toastify';

export const ExecuteSwap = ({
  quote,
  sellAmount,
  loading,
  setLoading,
  getSwapButtonText,
  isSwapButtonDisabled,
  onConnectWallet, // Receive the `connect` function as a prop
}) => {
  const { connected, publicKey, signTransaction, sendTransaction } = useWallet();

  const handleExecuteSwap = async () => {
    if (!quote || !connected || !publicKey) {
      toast.error('Please connect your wallet and fetch a quote first.');
      return;
    }

    setLoading(true);
    try {
      const swapTransaction = await fetchSwapTransaction(quote, publicKey);
      const transaction = VersionedTransaction.deserialize(
        Buffer.from(swapTransaction, 'base64')
      );

      const connection = new Connection('https://api.mainnet-beta.solana.com'); // Your QuickNode endpoint
      const signedTransaction = await signTransaction(transaction);
      const signature = await sendTransaction(signedTransaction, connection);

      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });

      toast.success('Swap successful!');
    } catch (error) {
      console.error('Error swapping tokens:', error);
      toast.error(`Swap failed: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={connected ? handleExecuteSwap : onConnectWallet} // Use `onConnectWallet` here
      disabled={isSwapButtonDisabled()}
      className={`bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-2 rounded-lg w-full ${
        isSwapButtonDisabled() ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {loading ? (
        <div className="custom-spinner"></div>
      ) : (
        getSwapButtonText()
      )}
    </button>
  );
};