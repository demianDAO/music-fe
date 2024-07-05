import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import NavLeft from './components/navLeft/Index';

export default function Manage() {
  return (
    <Grid  md={12} sm={12} container my={{ xl: 6, sm: 2 }} spacing={{ md: 6, sm: 2, xs: 1 }}>
      <Grid item md={1} sm={1} marginLeft={'150px'} minWidth={'300px'}>
        <NavLeft />
      </Grid>
      <Grid item md={8} sm={8} xs={8}>
        <Outlet></Outlet>
      </Grid>
    </Grid>
  );
}
