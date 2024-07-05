import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import { PodcastItem } from '@/api/song/discover';
import { Avatar } from '@mui/material';
import Style from './index.module.css';

interface Props {
  data: PodcastItem
}

export default function EpisodeCard(props: Props) {
  const navigator = useNavigate();
  const toPodcastDetail = (item: PodcastItem) => {
    navigator(`/PodcastDetail/${item.token_id}`);
  };

  return (
    <Stack className={Style.recentWrapper1} direction="column">
      <Stack className={Style.recentWrapper1shadow}></Stack>
      <Stack className={Style.recentWrapper1Above}>
        <Stack direction={'row'} onClick={() => toPodcastDetail(props.data)}>
          <img src={props.data.token_uri} alt="cover_image" />
          <Stack direction="column">
            <Stack className={Style.recentWrapper1Title}>{props?.data?.title}</Stack>
            {/* <Stack className={Style.recentWrapper1Info}>{props?.data[1]?.sub_title}</Stack> */}
            <Stack className={Style.recentWrapper1Line}></Stack>
            <Stack className={Style.recentWrapper1Other}>{props?.data?.overview}</Stack>
          </Stack>
        </Stack>
        <Stack direction={'row'} justifyContent="space-between" alignContent={'center'} paddingTop="20px">
          <Stack direction={'row'}>
            {props?.data[1]?.tag.map((item, index) => (
              <Stack key={index} className={Style.recentWrapper1Tag}>
                {item}
              </Stack>
            ))}
          </Stack>
          <Stack direction={'row'} alignItems="center">
            <Stack className={Style.recentWrapper1Hosted}>Hosted by:</Stack>
            <Stack direction={'row'} color={'#fff'}>
              {/* {props?.data?.artist_addr} */}
              <Avatar src={props?.data?.token_uri} alt={props?.data[1]?.title} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
