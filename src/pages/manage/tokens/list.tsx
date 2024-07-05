import { getOwnedSong } from '@/api/song';
import { PodcastItem } from '@/api/song/discover';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActiveAccount } from 'thirdweb/react';

export default function All() {
    const account = useActiveAccount();
    const [podcastData, setData] = useState<Array<PodcastItem>>([]);

    const loadData = async () => {
        if (!account?.address) return;
        const podcastData = await getOwnedSong(account?.address!)
        setData(podcastData);
    };

    useEffect(() => {
        loadData();
    }, [account]);

    const navigator = useNavigate();
    const toPodcastDetail = (item: PodcastItem) => {
        navigator(`/PodcastDetail/${item.token_id}`);
    };

    return (
        <ImageList variant="woven" cols={3} gap={8}>
            {podcastData.map((item) => (
                <ImageListItem
                    key={item.token_id}
                    onClick={() => toPodcastDetail(item)}
                    sx={{ cursor: 'pointer' }}
                >
                    <img
                        src={`${item.token_uri}`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        subtitle={<span>by: {item.artist_addr}</span>}
                    />
                </ImageListItem>
            ))
            }
        </ImageList >
    );
}
