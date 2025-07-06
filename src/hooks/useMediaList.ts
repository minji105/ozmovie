import { useEffect, useState } from 'react';
import type { MediaListItem } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import supabase from '@/supabaseClient';

export default function useMediaList({
  tableName,
}: {
  tableName: 'favorites' | 'likes';
}) {
  const { user } = useAuth();
  const [list, setList] = useState<MediaListItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setList([]);
      return;
    }

    const fetchList = async () => {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error(`Error fetching ${tableName}:`, error);
      } else if (data) {
        setList(
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

    fetchList();
  }, [user]);

  const isInList = (id: number) => {
    return list.some(el => el.id === id);
  };

  const toggleItem = async (item: MediaListItem) => {
    if (!user) return;

    if (isInList(item.id)) {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('user_id', user.id)
        .eq('tmdb_id', item.id);

      if (error) {
        console.error(`Error removing item from ${tableName}:`, error);
      } else {
        setList(prev => prev.filter(el => el.id !== item.id));
      }
    } else {
      const { error } = await supabase.from(tableName).insert([
        {
          user_id: user.id,
          tmdb_id: item.id,
          media_type: item.media_type,
          title: item.title,
          poster_path: item.poster_path,
        },
      ]);

      if (error) {
        console.error(`Error adding item to ${tableName}:`, error);
      } else {
        setList(prev => [...prev, item]);
      }
    }
  };

  return { list, loading, isInList, toggleItem };
}
