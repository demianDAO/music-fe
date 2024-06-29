import Grid from '@mui/material/Grid';
import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import PodTopBar from './components/PodTopBar';
import TopBar from './components/TopBar';
import Footer from './components/footer/Index';

import { useUserStore } from './hooks/userStore';
import AppRouter from './router';
import { ThirdwebProvider } from 'thirdweb/react';

export default function App() {
  const [userInfo, dispatch] = useUserStore();
  const { pathname } = useLocation();

  const isShow = () => {
    if (pathname.includes('Podcast') || pathname.includes('PodcastCreator')) {
      return false;
    }
  };
  return (
    <ThirdwebProvider>
      <Grid spacing={0} minHeight={'100vh'}>
        <Grid xs={12} lg={12} justifyContent="center" container bgcolor="#10062F">
          <TopBar></TopBar>
        </Grid>
        <Grid xs={12} lg={12}>
          <AppRouter></AppRouter>
          <Outlet></Outlet>
        </Grid>
        <Grid xs={12} lg={12} justifyContent="center" container bgcolor="#10062F">
          {isShow() === undefined ? <Footer></Footer> : null ? <Footer></Footer> : null}
        </Grid>
      </Grid>
    </ThirdwebProvider>
  );
}
