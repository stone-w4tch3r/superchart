import React from 'react';
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';
import {Point, Track} from "../chartModule/types.ts";

interface ChartProps {
    data: { points: Point[], tracks: Track[] };
}

const Chart: React.FC<ChartProps> = ({data}) => {
    const classes = {
        chartContainer: 'chart-container',
    };

    return <div className={classes.chartContainer}>
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data.points}>
                <XAxis dataKey="id"/>
                <YAxis dataKey="height"/>
                <Tooltip/>
                <Line type="monotone" dataKey="height" stroke="#8884d8"/>
            </LineChart>
        </ResponsiveContainer>
    </div>;
};

export default Chart;
