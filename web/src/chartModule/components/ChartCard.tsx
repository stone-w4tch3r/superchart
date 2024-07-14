import React from "react";
import {Box, CardContent, CardHeader, Skeleton, Typography} from "@mui/material";
import {StyledCard} from "./StyledCard.tsx";
import {IPoint, ITrack} from "../types.ts";
import Card from "@mui/material/Card";
import Chart from "./Chart.tsx";

export interface IChartProps {
    points: IPoint[];
    tracks: ITrack[];
    isLoading: boolean;
    error: string | null;
}

export const ChartCard: React.FC<{ params: IChartProps }> = ({params: {points, tracks, isLoading, error}}) => {
    return <StyledCard>
        <CardHeader title="Route Chart"/>
        <CardContent sx={{width: "100%", height: "100%", p: 0}}>
            {renderChartCardContent({points, tracks, isLoading, error})}
        </CardContent>
    </StyledCard>;
};

function renderChartCardContent({points, tracks, isLoading, error}: IChartProps) {
    if (isLoading) {
        return <Skeleton
            color={"#707070"}
            variant="rectangular"
            animation={"wave"}
            sx={{width: "100%", height: "100%", borderRadius: 5}}
        />;
    }
    if (points.length === 0 || tracks.length === 0) {
        return <Box sx={{
            bgcolor: "#f3f3f3",
            width: "100%",
            height: "100%",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Typography variant="h4"> No route loaded yet.</Typography>
        </Box>
    }
    if (error) {
        return <Card sx={{
            bgcolor: "pink",
            width: "100%",
            height: "100%",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Typography variant="h4" color="error">{error}</Typography>
        </Card>
    }
    return <Chart points={points} tracks={tracks}/>;
}