import { createContext, useContext, type ReactNode } from 'react';
import type { UserMediaItem } from '@/types';
import useMediaList from '@/hooks/useMediaList';

interface FavoriteContextType {
  favorites: UserMediaItem[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (item: UserMediaItem) => Promise<void>;
  loading: boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const {
    list: favorites,
    loading,
    isInList: isFavorite,
    toggleItem: toggleFavorite,
  } = useMediaList({
    tableName: 'favorites',
  });

  return (
    <FavoriteContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, loading }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within an FavoriteProvider');
  }
  return context;
}
