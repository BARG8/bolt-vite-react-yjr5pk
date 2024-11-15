import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, X } from 'lucide-react';

interface LoyaltyCard {
  id: string;
  storeName: string;
  storeImage: string;
  stamps: number;
  maxStamps: number;
  type: 'coffee' | 'bakery';
  reward: string;
  color: string;
}

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  storeName: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ isOpen, onClose, onConfirm, storeName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl transform transition-all animate-scale-in">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Delete Card</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete your loyalty card for {storeName}? This action cannot be undone.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const MyCardsPage = () => {
  const [loyaltyCards, setLoyaltyCards] = useState<LoyaltyCard[]>([
    {
      id: 'morning-brew',
      storeName: "Morning Brew Coffee",
      storeImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400",
      stamps: 3,
      maxStamps: 10,
      type: 'coffee',
      reward: 'Free Coffee',
      color: 'amber'
    },
    {
      id: 'fresh-bake',
      storeName: "Fresh Bake",
      storeImage: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=400",
      stamps: 7,
      maxStamps: 10,
      type: 'bakery',
      reward: 'Free Bread Loaf',
      color: 'yellow'
    }
  ]);

  const [deleteCardId, setDeleteCardId] = useState<string | null>(null);

  const handleDeleteCard = (cardId: string) => {
    setLoyaltyCards(cards => cards.filter(card => card.id !== cardId));
    setDeleteCardId(null);
  };

  const renderStamps = (card: LoyaltyCard) => {
    const stampIcon = card.type === 'coffee' ? '/coffee-cup.png' : '/bread.png';
    const bgColor = card.type === 'coffee' ? 'bg-amber-100' : 'bg-yellow-100';
    const stampColor = card.type === 'coffee' ? 'bg-amber-600' : 'bg-yellow-600';

    return Array.from({ length: card.maxStamps }, (_, index) => (
      <div
        key={index}
        className={`w-12 h-12 rounded-full flex items-center justify-center transform transition-all duration-300
          ${index < card.stamps 
            ? `${stampColor} shadow-lg scale-100` 
            : `${bgColor} border-2 border-dashed border-gray-300 scale-95`}`}
      >
        {index < card.stamps ? (
          <img 
            src={stampIcon} 
            alt="Stamp" 
            className="w-7 h-7 object-contain filter invert animate-stamp"
          />
        ) : (
          <div className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300" />
        )}
      </div>
    ));
  };

  const cardToDelete = deleteCardId ? loyaltyCards.find(card => card.id === deleteCardId) : null;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <Link 
              to="/" 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">My Loyalty Cards</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      {/* Cards List */}
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {loyaltyCards.map(card => (
          <div 
            key={card.id} 
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            {/* Card Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img 
                    src={card.storeImage} 
                    alt={card.storeName} 
                    className="w-16 h-16 rounded-xl object-cover shadow-sm"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{card.storeName}</h3>
                    <p className="text-sm text-gray-500">
                      {card.stamps} of {card.maxStamps} stamps collected
                    </p>
                    <div className="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Reward: {card.reward}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setDeleteCardId(card.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stamps Grid */}
            <div className="p-6 bg-gray-50">
              <div className="grid grid-cols-5 gap-4 justify-items-center">
                {renderStamps(card)}
              </div>
            </div>
          </div>
        ))}

        {loyaltyCards.length === 0 && (
          <div className="text-center py-12">
            <img 
              src="/coffee-cup.png" 
              alt="No cards" 
              className="w-20 h-20 mx-auto mb-4 opacity-30"
            />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Cards Yet</h3>
            <p className="text-gray-500">
              Start collecting loyalty cards from your favorite places
            </p>
            <Link
              to="/"
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Stores
            </Link>
          </div>
        )}
      </div>

      <DeleteConfirmation
        isOpen={!!deleteCardId}
        onClose={() => setDeleteCardId(null)}
        onConfirm={() => deleteCardId && handleDeleteCard(deleteCardId)}
        storeName={cardToDelete?.storeName || ''}
      />
    </div>
  );
};

export default MyCardsPage;