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

interface LikeContextType {
  likes: FavoriteItem[];
  isLiked: (id: number) => boolean;
  toggleLike: (item: FavoriteItem) => Promise<void>;
  loading: boolean;
}

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export function LikeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [likes, setLikes] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setLikes([]);
      return;
    }

    const fetchLikes = async () => {
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching likes:', error);
      } else if (data) {
        setLikes(
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

    fetchLikes();
  }, [user]);

  const isLiked = (id: number) => {
    return likes.some(el => el.id === id);
  };

  const toggleLike = async (item: FavoriteItem) => {
    if (!user) return;

    if (isLiked(item.id)) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', user.id)
        .eq('tmdb_id', item.id);

      if (error) {
        console.error('Error removing like:', error);
      } else {
        setLikes(prev => prev.filter(fav => fav.id !== item.id));
      }
    } else {
      const { error } = await supabase.from('likes').insert([
        {
          user_id: user.id,
          tmdb_id: item.id,
          media_type: item.media_type,
          title: item.title,
          poster_path: item.poster_path,
        },
      ]);

      if (error) {
        console.error('Error adding like:', error);
      } else {
        setLikes(prev => [...prev, item]);
      }
    }
  };

  return (
    <LikeContext.Provider value={{ likes, isLiked, toggleLike, loading }}>
      {children}
    </LikeContext.Provider>
  );
}

export function useLikes() {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLikes must be used within an LikeProvider');
  }
  return context;
}
