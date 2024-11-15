import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, QrCode, Wallet, Bell } from 'lucide-react';
import QRScanner from '../components/QRScanner';
import Logo from '../components/Logo';
import CategoryIcon from '../components/CategoryIcon';
import FavoriteButton from '../components/FavoriteButton';
import { useNotifications } from '../contexts/NotificationContext';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const { notificationsEnabled } = useNotifications();
  const navigate = useNavigate();

  const handleQRScan = (result: string) => {
    try {
      // Attempt to parse the QR code data
      const data = JSON.parse(result);
      
      // Validate the data structure
      if (data.type === 'loyalty-card' && data.storeId) {
        // Navigate to the store page
        navigate(`/store/${data.storeId}`);
        toast.success('Card scanned successfully!');
      } else {
        toast.error('Invalid QR code format');
      }
    } catch (error) {
      toast.error('Unable to read QR code');
    } finally {
      setIsQRScannerOpen(false);
    }
  };

  // Mock data for categories
  const categories = [
    {
      type: 'coffee',
      label: 'Coffee',
      bgColor: 'bg-amber-100',
      icon: '/coffee-cup.png'
    },
    {
      type: 'restaurant',
      label: 'Restaurant',
      bgColor: 'bg-red-100',
      icon: '/pizza.png'
    },
    {
      type: 'bakery',
      label: 'Bakery',
      bgColor: 'bg-yellow-100',
      icon: '/pub.png'
    }
  ];

  // Mock data for stores
  const stores = [
    {
      id: 'karmenaadjie-padstal',
      name: "Karmenaadjie Padstal",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=400",
      discount: "15% off",
      tags: ["Food", "Local"],
      rating: 4.8,
      reviewCount: 128
    },
    {
      id: 'craft-coffee',
      name: "Craft Coffee Co",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400",
      discount: "Buy 5 Get 1 Free",
      tags: ["Coffee", "Drinks"],
      rating: 4.9,
      reviewCount: 256
    }
  ];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 shadow-sm">
        <div className="flex items-center justify-between px-4 py-2">
          <Logo className="w-24" />
          <Link 
            to="/notifications"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            {notificationsEnabled && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
            )}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8 px-4">
          <button
            onClick={() => setIsQRScannerOpen(true)}
            className="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <div className="bg-blue-400/30 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <QrCode className="w-6 h-6" />
            </div>
            <span className="font-medium">Scan Card</span>
          </button>
          <Link
            to="/my-cards"
            className="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md group"
          >
            <div className="bg-emerald-400/30 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Wallet className="w-6 h-6" />
            </div>
            <span className="font-medium">My Cards</span>
          </Link>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="px-4 text-lg font-semibold mb-4">Categories</h2>
          <div className="flex gap-4 px-4 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <CategoryIcon
                key={category.type}
                type={category.type}
                label={category.label}
                bgColor={category.bgColor}
                icon={category.icon}
              />
            ))}
          </div>
        </div>

        {/* Local Loyalty Offers */}
        <div className="px-4">
          <h2 className="text-lg font-semibold mb-4 bg-[#E6E8E6] p-3 rounded-lg">
            Local Loyalty Offers
          </h2>
          <div className="grid gap-6">
            {stores.map((store) => (
              <Link
                key={store.id}
                to={`/store/${store.id}`}
                className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <div className="relative">
                  <img 
                    src={store.image} 
                    alt={store.name}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <FavoriteButton store={store} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
                    <p className="text-blue-600 text-sm font-medium">{store.discount}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800">{store.name}</h3>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-700">{store.rating}</span>
                      <span className="ml-1 text-xs text-gray-500">({store.reviewCount})</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {store.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      <QRScanner
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScan={handleQRScan}
      />
    </div>
  );
};

export default HomePage;