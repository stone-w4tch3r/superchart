import React, {useState} from 'react';
import {Box, CircularProgress, Grid, Typography} from '@mui/material';
import {Navbar} from './components/Navbar.tsx';
import {Footer} from "./components/Footer.tsx";
import {ChartControls, ChartCard} from "./components/Cards.tsx";
import {useFetchRoute} from "./useFetchRoute.ts";

const ChartPage: React.FC = () => {
    const [numPoints, setNumPoints] = useState<number>(11);
    const {chartName, points, tracks, isLoading, error, fetchRoute} = useFetchRoute(numPoints);

    return <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <Navbar/>
        <Box sx={{py: 5, px: 5, flexGrow: 1}}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={8}>
                    <ChartCard params={{points, tracks, isLoading, error}}/>
                </Grid>
                <Grid item xs={12} md={4}>
                    <ChartControls
                        fetchRoute={fetchRoute}
                        chartName={chartName}
                        chartPointsCount={numPoints}
                        setNumPoints={setNumPoints}
                    />
                </Grid>
            </Grid>
        </Box>
        <Footer/>
    </Box>;
};

export default ChartPage;

