import Card from "@mui/material/Card";
import {CardContent, CardHeader, Grid, MenuItem, Skeleton, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {IPoint, ITrack} from "../types.ts";
import Chart from "./Chart.tsx";
import Button from "@mui/material/Button";

const StyledCard = ({children}) =>
    <Card sx={{borderRadius: 6, boxShadow: 3, height: 500, pb: 12, px: 4, pt: 2}}>
        {children}
    </Card>;

export interface IChartParams {
    points: IPoint[];
    tracks: ITrack[];
    isLoading: boolean;
    error: string | null;
}

export const ChartCard: React.FC<{ params: IChartParams }> = ({params: {points, tracks, isLoading, error}}) => {
    return <StyledCard>
        <CardHeader title="Sales Chart"/>
        <CardContent sx={{width: "100%", height: "100%", p: 0}}>
            {renderChartCardContent({points, tracks, isLoading, error})}
        </CardContent>
    </StyledCard>;
};

export interface IChartControlsProps {
    fetchRoute: () => void;
    chartName: string;
    chartPointsCount: number | null;
    setNumPoints: (numPoints: number) => void;
}

export const ChartControls: React.FC<IChartControlsProps> = (
    {
        fetchRoute,
        chartName,
        chartPointsCount,
        setNumPoints
    }) => {
    const [inputError, setInputError] = useState<string | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '') {
            setInputError('');
            setIsButtonDisabled(true);
        } else {
            const numPoints = Number(value);
            if (isNaN(numPoints) || numPoints < 2 || numPoints > 200) {
                setInputError('Number between 2 and 200');
                setIsButtonDisabled(true);
            } else {
                setInputError('');
                setIsButtonDisabled(false);
                setNumPoints(numPoints);
            }
        }
    };

    const handleClick = () => {
        console.log(chartPointsCount);
        if (chartPointsCount !== null && chartPointsCount >= 2 && chartPointsCount <= 200) {
            fetchRoute();
        }
    }

    return <StyledCard>
        {/* '& > *' is a CSS selector that selects all direct children of the parent element*/}
        <CardHeader title="Chart Controls"/>
        <CardContent sx={{'& > *': {mb: 2}, display: "flex", flexDirection: "column", height: '100%'}}>
            <TextField
                label="Number of points"
                type="number"
                size="medium"
                fullWidth
                error={!!inputError}
                helperText={inputError}
                onChange={handleInputChange}
            />
            <Button
                type="submit"
                variant="contained"
                onClick={handleClick}
                sx={{mt: "auto", borderRadius: 4}}
                disabled={isButtonDisabled}
            >
                Load Route
            </Button>
        </CardContent>
    </StyledCard>;
};

function renderChartCardContent({points, tracks, isLoading, error}: IChartParams) {
    if (isLoading) {
        return <Skeleton
            color={"#707070"}
            variant="rectangular"
            animation={"wave"}
            sx={{width: "100%", height: "100%", borderRadius: 5}}
        />;
    }
    if (points.length === 0 || tracks.length === 0) {
        return <Card sx={{
            bgcolor: "#f3f3f3",
            width: "100%",
            height: "100%",
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Typography variant="h4"> No route loaded yet.</Typography>
        </Card>
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