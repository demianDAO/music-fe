import { PodcastItem, getDiscoverList } from '@/api/song/discover';
import EpisodeCard from '@/components/episodeCard/Index';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react';

export default function All() {
  const [podcastData, setData] = useState<Array<PodcastItem>>([]);

  const loadData = async () => {
    const podcastData = await getDiscoverList()
    setData(podcastData);
  };
  
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Stack direction={'row'} width="100%" flexWrap="wrap" margin="10px" justifyContent={'center'}>
      {podcastData?.map((item, index) => (
        <EpisodeCard key={index} data={item} />
      ))}
    </Stack>
  );
}
