import { useEffect, useState } from 'react';
import { API_KEY } from '@constants/index';

export default function useFetch<T>(query: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    fetch(`https://api.themoviedb.org/3/${query}`, options)
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        console.log('fetch success ', resData);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [query]);

  return { data, loading };
}
