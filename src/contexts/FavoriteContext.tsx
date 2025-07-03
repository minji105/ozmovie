import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { FavoriteItem } from '@/types';
import supabase from '@/supabaseClient';
import { useAuth } from './AuthContext';

interface FavoriteContextType {
  favorites: FavoriteItem[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (item: FavoriteItem) => Promise<void>;
  loading: boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined,
);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const fetchFavorites = async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching favorites:', error);
      } else if (data) {
        setFavorites(
          data.map(item => ({
            id: item.tmdb_id,
            media_type: item.media_type,
            title: item.title,
            poster_path: item.poster_path,
          })),
        );
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [user]);

  const isFavorite = (id: number) => {
    return favorites.some(el => el.id === id);
  };

  const toggleFavorite = async (item: FavoriteItem) => {
    if (!user) return;

    if (isFavorite(item.id)) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('tmdb_id', item.id);

      if (error) {
        console.error('Error removing favorite:', error);
      } else {
        setFavorites(prev => prev.filter(fav => fav.id !== item.id));
      }
    } else {
      const { error } = await supabase.from('favorites').insert([
        {
          user_id: user.id,
          tmdb_id: item.id,
          media_type: item.media_type,
          title: item.title,
          poster_path: item.poster_path,
        },
      ]);

      if (error) {
        console.error('Error adding favorite:', error);
      } else {
        setFavorites(prev => [...prev, item]);
      }
    }
  };

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