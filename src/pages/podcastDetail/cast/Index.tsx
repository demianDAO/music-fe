import img1 from '@/public/episodes/img1.png';
import img2 from '@/public/episodes/img2.png';
import img3 from '@/public/episodes/img3.png';
import img4 from '@/public/episodes/img4.png';
import img5 from '@/public/episodes/img5.png';
import img6 from '@/public/episodes/img6.png';
import img7 from '@/public/episodes/img7.png';
import img8 from '@/public/episodes/img8.png';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Avatar, Button, Divider } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import { getOwnedSong } from '@/api/song';
import { PodcastItem, getDiscoverList } from '@/api/song/discover';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Player } from 'shikwasa';
import 'shikwasa/dist/style.css';
import { useActiveAccount } from 'thirdweb/react';
import Style from './index.module.css';
import Pay from './pay';


export default function Cast() {
  const { principal, tokenId } = useParams();

  const [podcastData, setPodcastData] = useState<PodcastItem>({
    title: '',
    artist_addr: '',
    overview: '',
    token_id: 0,
    token_uri: '',
    price: 0,
    tx_id: '',
  });

  const activeAccount = useActiveAccount();

  const getPodcastData = async () => {
    if (activeAccount === undefined) return;
    const data = await getDiscoverList()
    const podcastData = data?.filter(item => Number(tokenId) == Number(item.token_id))[0]!
    setPodcastData(podcastData)
  }

  const [has, setHas] = useState(false);
  const hasPodcast = async () => {
    if (activeAccount === undefined) return;
    const owned = await getOwnedSong(activeAccount?.address!)
    setHas(owned.find(item => Number(tokenId) === Number(item.token_id)) !== undefined)
  }

  useEffect(() => {
    getPodcastData()
    hasPodcast()
  }, [activeAccount === undefined]);

  const [playStatus, setPlayer] = useState(false);

  // to creator toPodcastCreator
  const navigator = useNavigate();
  const toPodcastCreator = principal => {
    navigator(`/podcastCreator/${principal}`);
  };

  const showPlayer = async (data: PodcastItem) => {
    if (!playStatus) {
      setPlayer(true);
    }

    const player = new Player({
      container: () => document.querySelector('.shikawa-podcast'),
      themeColor: 'gray',
      theme: 'light',
      fixed: {
        type: 'static',
      },
      audio: {
        title: data.title,
        artist: data.artist_addr,
        cover: data.token_uri,
        src: `https://music-platform.zeabur.app/v1/song/${data.tx_id}`,
      },
    });

    player.play();

    if (!has) {
      setTimeout(() => {
        player.destroy();
        setPlayer(false);
      }, 5000);
    }
  };

  return (
    <Stack
      direction={'row'}
      justifyContent="center"
      alignItems={'center'}
      padding="120px"
      bgcolor="#10062F"
      paddingBottom={'220px'}>
      <Stack direction={'row'} justifyContent="center" position="relative">
        <Stack position="absolute" top={'243px'} left={'9px'}>
          <img src={img1} className={Style.img1} alt="" />
          <img src={img2} className={Style.img2} alt="" />
          <img src={img3} className={Style.img3} alt="" />
          <img src={img4} className={Style.img4} alt="" />
        </Stack>
        <Stack position="absolute" zIndex={1} right={'100px'} top={'210px'}>
          <img src={img5} className={Style.img5} alt="" />
          <img src={img6} className={Style.img6} alt="" />
          <img src={img7} className={Style.img7} alt="" />
          <img src={img8} className={Style.img8} alt="" />
        </Stack>
        <Stack paddingRight={'100px'}>
          <Avatar
            alt="host page"
            sx={{ cursor: 'pointer', width: '445px', height: '488px' }}
            // onClick={() => toPodcastCreator(principal)}
            src={podcastData?.token_uri}
          />
        </Stack>
        <Stack direction={'column'} width={'549px'}>
          <Stack
            sx={{
              fontSize: '43px',
              fontFamily: 'Trebuchet-BoldItalic, Trebuchet',
              fontWeight: 'normal',
              color: '#FFFFFF',
              lineHeight: '65px',
            }}>
            {podcastData?.title}
          </Stack>
          {/* <Stack direction={'row'} sx={{ color: '#fff' }}>
            <CalendarMonthIcon /> {dayjs.unix(Number(podcastData[0]?.[1]?.create_at) / 1000).format('MMM-DD-YYYY')}
          </Stack> */}

          <Stack sx={{ marginY: '30px' }}>
            <Stack
              sx={{
                position: 'relative',
                width: '588px',
                height: '110px',
                borderRadius: '30px',
                background: 'linear-gradient(90deg, rgba(209, 48, 179, 1), rgba(58, 79, 231, 1))',
                zIndex: '1',
              }}>
              <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={1}
                sx={{
                  position: 'absolute',
                  width: '583px',
                  height: '105px',
                  top: '2.5px',
                  left: '2.5px',
                  color: '#fff',
                  fontSize: '20px',
                  fontWeight: 900,
                  borderRadius: '28px',
                  padding: '10px',
                  zIndex: '20',
                  bgcolor: '#10062F',
                  whiteSpace: 'nowrap',
                  ':hover': {
                    bgcolor: '#10062F',
                  },
                }}>
                {/* <Avatar
                  sx={{ cursor: 'pointer' }}
                  onClick={() => toPodcastCreator(principal)}
                  src={podcastData[0]?.[1]?.cover_image}
                /> */}

                <Stack>
                  <Stack
                    sx={{
                      fontSize: '16px',
                      fontFamily: 'ArialMT',
                      color: '#FFFFFF',
                      lineHeight: ' 21px',
                      paddingBottom: '8px',
                      width: '200px',
                      overflow: 'hidden',
                    }}>
                    {/* {podcastData[0]?.[1]?.sub_title} */}
                  </Stack>
                  <Stack
                    sx={{
                      width: '200px',
                      height: '20px',
                      fontSize: '16px',
                      fontFamily: 'ArialMT',
                      color: '#B5B5C3',
                      lineHeight: '21px',
                      overflow: 'hidden',
                    }}>
                    Hosted by: {podcastData?.artist_addr}
                  </Stack>
                </Stack>
                {/* <audio controls color="black">
                  <source src={podcastData[0]?.[1]?.show_note} type="audio/ogg" />
                </audio> */}

                <Stack onClick={() => showPlayer(podcastData)} sx={{
                  marginTop: '15px',
                  fontSize: '16px',
                  color: '#B5B5C3',
                  lineHeight: '21px',
                }}>
                  {playStatus ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
                  {!has ? "try 5 second" : ""}
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <Divider variant="middle" sx={{ marginY: '30px', color: '#fff', borderColor: '#fff', opacity: 0.3 }} />

          <Stack
            sx={{
              fontSize: '28px',
              fontFamily: ' Arial-BoldMT, Arial',
              fontWeight: 'normal',
              color: '#FFFFFF',
              lineHeight: '38px',
              minHeight: '180px',
              overflow: 'hidden',
            }}>
            {podcastData?.overview}
          </Stack>

          {/* <Stack direction={'row'} sx={{ color: '#fff', paddingBottom: '30px' }}>
            <Stack
              sx={{
                width: '200px',
                height: '20px',
                fontSize: '16px',
                fontFamily: 'ArialMT',
                color: '#B5B5C3',
                lineHeight: '21px',
                overflow: 'hidden',
              }}>
              Guests :
              {podcastData[0]?.[1]?.guests
                ? podcastData[0]?.[1]?.guests?.map(item => {
                  return item.toText();
                })
                : 'not yet'}
            </Stack>
          </Stack> */}
          {
            has ? (
              <Button sx={{
                fontSize: '16px',
                color: '#B5B5C3',
                lineHeight: '21px',
              }} variant="contained" size="large">
                Collected
              </Button>
            )
              :
              (<Pay amount={podcastData?.price}
                tokenId={BigInt(podcastData?.token_id! as number)}
                singer={podcastData?.artist_addr!}></Pay>)
          }


        </Stack>
      </Stack>

      <Stack
        position={'fixed'}
        className="shikawa-podcast"
        sx={{ bottom: '0px', marginTop: '20px', width: '100%', zIndex: 99 }}></Stack>
    </Stack >
  );
}
