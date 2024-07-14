import React, {useState} from 'react';
import {Box, Grid} from '@mui/material';
import {Topbar} from './components/Topbar.tsx';
import {Footer} from "./components/Footer.tsx";
import {useFetchRoute} from "./useFetchRoute.ts";
import {DescriptionCard} from "./components/DescriptionCard.tsx";
import {ChartCard} from "./components/ChartCard.tsx";
import {ChartControlsCard} from "./components/ChartControlsCard.tsx";

const ChartPage: React.FC = () => {
    const [numPoints, setNumPoints] = useState<number>(11);
    const {chartName, points, tracks, isLoading, error, fetchRoute} = useFetchRoute(numPoints);
    const spacingMobile = 2;
    const spacingAdaptive = 4;
    const chartCardsHeight = 600;

    return <Box sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <Topbar/>
        <Box sx={{
            py: {xs: spacingMobile, md: spacingAdaptive},
            px: {xs: spacingMobile, md: spacingAdaptive},
            flexGrow: 1
        }}>
            <Grid container spacing={{xs: spacingMobile, md: spacingAdaptive}}>
                <Grid item xs={12}>
                    <DescriptionCard/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <ChartCard points={points}
                               tracks={tracks}
                               isLoading={isLoading}
                               error={error}
                               height={chartCardsHeight}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <ChartControlsCard
                        fetchRoute={fetchRoute}
                        chartName={chartName}
                        chartPointsCount={numPoints}
                        setNumPoints={setNumPoints}
                        height={chartCardsHeight}
                    />
                </Grid>
            </Grid>
        </Box>
        <Footer/>
    </Box>;
};

export default ChartPage;

