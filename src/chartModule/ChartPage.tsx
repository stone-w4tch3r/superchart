import React from 'react';
import Layout from './components/Layout';
import Chart from './components/Chart';
import {useFetchRoute} from "./useFetchRoute.ts";
import {Skeleton, Typography} from "@mui/material";
import Button from "@mui/material/Button";


const ChartPage: React.FC = () => {
    const {points, tracks, isLoading, error} = useFetchRoute();

    return <Layout>
        <Button variant="contained" onClick={useFetchRoute}>
            Load Route
        </Button>
        {isLoading && <Skeleton variant="rectangular" animation='wave' width="100%" height="100px"/>}
        {error && <Typography variant="h3" color="error">{error}</Typography>}
        {!isLoading && !error && <Chart data={{points, tracks}}/>}
    </Layout>;
};

export default ChartPage;
