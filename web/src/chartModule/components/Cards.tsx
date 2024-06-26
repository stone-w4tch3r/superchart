import Card from "@mui/material/Card";
import {CardContent, CardHeader, Grid, MenuItem} from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import {LineChart} from "@mui/x-charts";

const StyledCard = ({children}) =>
    <Card sx={{p: 2, borderRadius: 6, boxShadow: 3, height: 500}}>
        {children}
    </Card>;

export const SalesChart: React.FC = () => {
    return <StyledCard>
        <CardHeader title="Sales Chart"/>
        <CardContent>
            <LineChart
                xAxis={[{data: [1, 2, 3, 5, 8, 10]}]}
                series={[
                    {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                ]}
                width={400}
                height={300}
                sx={{bgcolor: "red"}}
            />
        </CardContent>
    </StyledCard>;
};

export const ChartControls: React.FC = () => {
    return <StyledCard>
        <CardHeader title="Chart Controls"/>
        <CardContent sx={{'& > *': {mt: 2}}}>
            <TextField
                select
                fullWidth
                label="Metric"
                defaultValue="Revenue"
                size="small"
            >
                <MenuItem value="Revenue">Revenue</MenuItem>
                <MenuItem value="Profit">Profit</MenuItem>
            </TextField>
            <TextField
                select
                fullWidth
                label="Timeframe"
                defaultValue="Monthly"
                size="small"
            >
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Quarterly">Quarterly</MenuItem>
            </TextField>
            <TextField
                select
                fullWidth
                label="Chart Type"
                defaultValue="Line"
                size="small"
            >
                <MenuItem value="Line">Line</MenuItem>
                <MenuItem value="Bar">Bar</MenuItem>
            </TextField>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        type="date"
                        fullWidth
                        label="Date Range"
                        defaultValue="2023-01-01"
                        size="small"
                        InputLabelProps={{shrink: true}}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="date"
                        fullWidth
                        defaultValue="2023-12-31"
                        size="small"
                        InputLabelProps={{shrink: true}}
                    />
                </Grid>
            </Grid>
        </CardContent>
    </StyledCard>;
};