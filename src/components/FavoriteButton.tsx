import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';

interface FavoriteButtonProps {
  store: {
    id: string;
    name: string;
    image: string;
    discount: string;
    tags: string[];
    rating: number;
    reviewCount: number;
  };
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ store }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFav = isFavorite(store.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFav) {
      removeFavorite(store.id);
    } else {
      addFavorite(store);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`absolute top-4 left-4 p-2 rounded-full transition-all duration-300 ${
        isFav 
          ? 'bg-red-500 text-white hover:bg-red-600' 
          : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:text-red-500'
      }`}
    >
      <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
    </button>
  );
};

export default FavoriteButton;