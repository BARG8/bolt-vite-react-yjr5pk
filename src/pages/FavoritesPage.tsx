import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();

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
            <h1 className="text-xl font-bold text-gray-900">Favorite Stores</h1>
            <div className="w-10"></div>
          </div>
        </div>
      </div>

      {/* Favorites List */}
      <div className="max-w-2xl mx-auto p-4">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {favorites.map(store => (
              <div 
                key={store.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <Link to={`/store/${store.id}`}>
                  <div className="relative">
                    <img 
                      src={store.image} 
                      alt={store.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
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
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Star className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Favorites Yet</h3>
            <p className="text-gray-500">
              Start adding your favorite stores to see them here
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
    </div>
  );
};

export default FavoritesPage;