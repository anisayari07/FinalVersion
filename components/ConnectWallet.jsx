import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';

export const ConnectWallet = () => {
  const { connected, publicKey, connect, disconnect, wallets, select } = useWallet();
  const [phantomDetected, setPhantomDetected] = useState(false);

  const handleConnectWallet = async () => {
    try {
      if (connected) {
        await disconnect();
      } else {
        const isPhantomInstalled = window.solana && window.solana.isPhantom;
        if (isPhantomInstalled) {
          setPhantomDetected(true);
          setTimeout(() => {
            setPhantomDetected(false);
            if (wallets.length > 0) {
              select(wallets[0].adapter.name);
            }
            connect();
          }, 700);
        } else {
          window.open('https://phantom.app/', '_blank');
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const getButtonText = () => {
    if (phantomDetected) return 'Phantom Detected';
    if (connected) return `Connected: ${publicKey?.toBase58().slice(0, 6)}...${publicKey?.toBase58().slice(-4)}`;
    return 'Connect Wallet';
  };

  return (
    <button
      onClick={handleConnectWallet}
      className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-2 rounded-full"
    >
      <span className={phantomDetected ? 'text-black font-semibold' : 'text-white'}>
        {getButtonText()}
      </span>
    </button>
  );
};