export interface PodcastItem {
  title: string;
  artist_addr: string;
  overview: string;
  token_id: number;
  token_uri: string;
  price: number;
  id?: number;
}

export const getDiscoverList = async (): Promise<PodcastItem[]> => {
  const response = await fetch('https://music-platform.zeabur.app/v1/song/discovery/3', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('response');
  }
  return await response.json();
};
