import { ConnectWallet } from './ConnectWallet';
import { Link } from 'react-router-dom'; // Import Link for navigation

export const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        <h2 className="text-xl font-bold text-white">URANUS</h2>
      </div>
      <div className="flex gap-6">
        {/* Spot Link */}
        <Link
          to="/"
          className={`relative font-orbitron text-white hover:text-white transition-all duration-300 ${
            activeTab === 'Spot' ? 'font-bold' : ''
          }`}
          onClick={() => setActiveTab('Spot')}
        >
          Spot
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-teal-300 transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Mobile Link */}
        <Link
          to="/mobile"
          className={`relative font-orbitron text-white hover:text-white transition-all duration-300 ${
            activeTab === 'Mobile' ? 'font-bold' : ''
          }`}
          onClick={() => setActiveTab('Mobile')}
        >
          Mobile
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-teal-300 transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        {/* Our Coin Link */}
        <Link
          to="/our-coin"
          className={`relative font-orbitron text-white hover:text-white transition-all duration-300 ${
            activeTab === 'Our Coin' ? 'font-bold' : ''
          }`}
          onClick={() => setActiveTab('Our Coin')}
        >
          Our Coin
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-teal-300 transform -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>
      <ConnectWallet />
    </div>
  );
};