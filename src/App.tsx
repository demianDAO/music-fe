import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import './App.css';
import TopBar from './components/TopBar';
import Footer from './components/footer/Index';

import { ThirdwebProvider } from 'thirdweb/react';
import AppRouter from './router';

export default function App() {
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
          <Footer></Footer>
        </Grid>
      </Grid>
    </ThirdwebProvider>
  );
}
