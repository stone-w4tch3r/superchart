import React, {useEffect} from 'react';
import Layout from './components/Layout';
import Chart from './components/Chart';
import {useFetchRoute} from "./useFetchRoute.ts";
import {Skeleton, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {IPoint, ITrack} from "./types.ts";
import Stack from "@mui/material/Stack";


const ChartPage: React.FC = () => {
    const {points, tracks, isLoading, error, fetchRoute} = useFetchRoute();

    return <Layout>
        <Stack spacing={2} alignItems={'center'} direction='column' >
            <Box>
                {renderChartBoxContent(points, tracks, isLoading, error)}
            </Box>
            <Button variant="contained" onClick={fetchRoute}>
                Load Route
            </Button>
        </Stack>
    </Layout>;
};

function renderChartBoxContent(points: IPoint[], tracks: ITrack[], isLoading: boolean, error: React.ReactNode) {
    if (isLoading) {
        return <Skeleton variant="rectangular" animation='wave' width="100%" height="100px"/>
    }
    if (error) {
        return <Typography variant="h3" color="error">{error}</Typography>
    }
    return <Chart data={{points, tracks}}/>
}

export default ChartPage;
