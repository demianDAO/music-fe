import { useQuery } from '@tanstack/react-query';
import { PodcastItem } from './discover';

const host = 'https://music-platform.zeabur.app';

export async function useGetOwnedSong(userAddr: string) {
  return useQuery({
    queryKey: ['getOwnedSong', userAddr],
    queryFn: ({ queryKey }) => getOwnedSong(queryKey[0]),
  });
}
export async function getOwnedSong(userAddr: string): Promise<PodcastItem[]> {
  const response = await fetch(`${host}/v1/song?user_addr=${userAddr}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('response');
  }

  return await response.json();
}
