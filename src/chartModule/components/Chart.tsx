import React from 'react';
import {Point, Track} from "../types.ts";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

interface ChartProps {
    data: { points: Point[], tracks: Track[] };
}

const Chart: React.FC<ChartProps> = ({data}) => {
    return <Box bgcolor={'#f5f5f5'}>
        {/*todo implement chart*/}
        <Typography variant="h6">
            There would be a chart.
            Text representation of the data:
            {JSON.stringify(data, null, 2)}
        </Typography>
    </Box>;
};

export default Chart;
