import React from "react";
import {CardContent, CardHeader, Typography} from "@mui/material";
import {StyledCard} from "./StyledCard.tsx";

export const DescriptionCard: React.FC = () => {
    return <StyledCard height="100%" paddingBottom={4}>
        <CardHeader title="Description"/>
        <CardContent>
            <Typography variant="body1">
                This is a simple webpage that displays a height chart of a route.
                To get one, you need to provide the number of points. Than backend will generate a random route for you.
                <br/>Colors on chart represent additional data. You can hover with mouse over the chart to see the exact
                values.
            </Typography>
        </CardContent>
    </StyledCard>;
}