import React, {useState} from "react";
import {CardContent, CardHeader} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {StyledCard} from "./StyledCard.tsx";

export interface IChartControlsProps {
    fetchRoute: () => void;
    chartName: string;
    chartPointsCount: number | null;
    setNumPoints: (numPoints: number) => void;
}

export const ChartControlsCard: React.FC<IChartControlsProps> = (
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