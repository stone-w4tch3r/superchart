import Chart from './components/Chart';
import {useFetchRoute} from "./useFetchRoute.ts";
import {AppBar, Skeleton, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {IPoint, ITrack} from "./types.ts";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";


const ChartPage: React.FC = () => {
    const [numPoints, setNumPoints] = useState<number>(11);
    const {points, tracks, isLoading, error, fetchRoute} = useFetchRoute(numPoints);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchRoute();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setNumPoints(isNaN(value) ? 0 : value);
    };

    return <Layout>
        <Stack spacing={2} alignItems={'center'} direction='column'>
            <Card elevation={2}>
                {renderChartCardContent(points, tracks, isLoading, error)}
            </Card>
            <Card elevation={2}>
                <Typography variant="h4">Load Route</Typography>
                <TextField
                    type="number"
                    label="Number of Points"
                    value={numPoints}
                    onChange={handleInputChange}
                    inputProps={{min: 1}}
                />
                <Button type="submit" variant="contained" onClick={handleSubmit}>
                    Load Route
                </Button>
            </Card>
        </Stack>
    </Layout>;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return <>
        <AppBar position="static"
            // sx={{
            //     height: {xl: "10vh"}
            // }}
        >
            <Toolbar sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: "flex-start",
                justifyContent: "center",
                // height: "100vh",
            }}>
                <Typography variant="h3">
                    Route Visualization
                </Typography>
            </Toolbar>
        </AppBar>
        <Stack alignItems={"center"}
               spacing={2}
               paddingX={5}
               paddingTop={2}
               height={'100vh'}
        >
            {children}
        </Stack>
    </>;
}

function renderChartCardContent(points: IPoint[], tracks: ITrack[], isLoading: boolean, error: React.ReactNode) {
    if (isLoading) {
        return <Skeleton variant="rectangular" animation='wave' width="100%" height="100px"/>
    }
    if (error) {
        return <Typography variant="h3" color="error">{error}</Typography>
    }
    return <Chart points={points} tracks={tracks}/>;
}

export default ChartPage;
