import { createContext, useContext, type ReactNode } from 'react';
import type { UserMediaItem } from '@/types';
import useMediaList from '@/hooks/useMediaList';

interface LikeContextType {
  likes: UserMediaItem[];
  isLiked: (id: number) => boolean;
  toggleLike: (item: UserMediaItem) => Promise<void>;
  loading: boolean;
}

const LikeContext = createContext<LikeContextType | undefined>(undefined);

export function LikeProvider({ children }: { children: ReactNode }) {
  const {
    list: likes,
    loading,
    isInList: isLiked,
    toggleItem: toggleLike,
  } = useMediaList({
    tableName: 'likes',
  });

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
