import React from 'react';
import {Box, Grid} from '@mui/material';
import {Navbar} from './components/Navbar.tsx';
import {Footer} from "./components/Footer.tsx";
import {ChartControls, SalesChart} from "./components/Cards.tsx";

const DashboardPageV2: React.FC = () => {
    return <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <Navbar/>
        <Box sx={{py: 5, px: 5, flexGrow: 1}}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={8}>
                    <SalesChart/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <ChartControls/>
                </Grid>
            </Grid>
        </Box>
        <Footer/>
    </Box>;
};

export default DashboardPageV2;
