import Chart from './components/Chart';
import {useFetchRoute} from "./useFetchRoute.ts";
import {AppBar, CircularProgress, Skeleton, Toolbar, Typography} from "@mui/material";
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        setNumPoints(isNaN(value) ? 0 : value);
    };

    return <>
        <AppBar position="static"
            // sx={{
            //     height: {xl: "10vh"}
            // }}
        >
            <Toolbar
                sx={{display: 'flex', flexDirection: 'column', alignItems: "flex-start", justifyContent: "center",}}
            >
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
            <Card elevation={2} sx={{width: 800, height: 400}}>
                {renderChartCardContent(points, tracks, isLoading, error)}
            </Card>
            <Card elevation={2} sx={{width: 800, height: 400, padding: 2}}>
                <Typography variant="h4">Load Route</Typography>
                <TextField
                    type="number"
                    label="Number of Points"
                    value={numPoints}
                    onChange={handleInputChange}
                    inputProps={{min: 1}}
                />
                <Button type="submit" variant="contained" onClick={fetchRoute}>
                    Load Route
                </Button>
            </Card>
        </Stack>
    </>
};


function renderChartCardContent(points: IPoint[], tracks: ITrack[], isLoading: boolean, error: React.ReactNode) {
    if (isLoading) {
        return <CircularProgress sx={{position: 'relative', top: '50%', left: '50%',}}/>;
    }
    if (points.length === 0 || tracks.length === 0) {
        return <Typography variant="h3">No route loaded</Typography>; //todo: style
    }
    if (error) {
        return <Typography variant="h3" color="error">{error}</Typography> //todo: style
    }
    return <Chart points={points} tracks={tracks}/>;
}

export default ChartPage;
