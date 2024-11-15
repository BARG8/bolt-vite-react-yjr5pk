import React, { createContext, useContext, useState, useEffect } from 'react';

interface Store {
  id: string;
  name: string;
  image: string;
  discount: string;
  tags: string[];
  rating: number;
  reviewCount: number;
}

interface FavoritesContextType {
  favorites: Store[];
  addFavorite: (store: Store) => void;
  removeFavorite: (storeId: string) => void;
  isFavorite: (storeId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Store[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (store: Store) => {
    setFavorites(prev => [...prev, store]);
  };

  const removeFavorite = (storeId: string) => {
    setFavorites(prev => prev.filter(store => store.id !== storeId));
  };

  const isFavorite = (storeId: string) => {
    return favorites.some(store => store.id === storeId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};