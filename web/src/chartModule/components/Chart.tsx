import React from 'react';
import {IPoint, ITrack, MaxSpeed, Surface} from "../types.ts";
import {
    AllSeriesType,
    ChartContainer,
    ChartsAxisContentProps,
    ChartsAxisHighlight,
    ChartsTooltip,
    ChartsXAxis,
    ChartsYAxis,
    LinePlot,
    MarkPlot, useDrawingArea
} from "@mui/x-charts";
import Paper from "@mui/material/Paper";
import {Typography} from "@mui/material";

interface IChartPoint {
    id: number;
    name: string;
    height: number;
    distanceFromStart: number;
}

interface ChartProps {
    data: { points: IPoint[], tracks: ITrack[] };
}

const Chart: React.FC<ChartProps> = ({data}) => {
    if (data.points.length === 0 || data.tracks.length === 0) {
        return <Paper sx={{padding: 3, backgroundColor: "pink"}}>
            <Typography variant="caption">No data to display</Typography>
        </Paper>;
    }
    
    const {
        pointSequences,
        surfacesWithXCoordinates,
        xValues,
        chartPoints
    } = convertToChartData(data.points, data.tracks);

    const coloredColumns = surfacesWithXCoordinates.map(
        ([x1, x2, surface]) => [x1, x2, surfaceToColor[surface]] as [number, number, string]
    );
    const series = pointSequences.map(
        ([speed, points]) => ({
            data: points.map(point => point?.height),
            type: 'line',
            color: speedToColor[speed],
            curve: "linear",
        } as AllSeriesType)
    );

    return <ChartContainer
        series={series}
        xAxis={[{
            scaleType: 'linear',
            data: xValues,
            max: xValues[xValues.length - 1],
            id: 'x-linear-axis-id',
        }]}
        width={800}
        height={400}
    >
        <Background coloredColumns={coloredColumns}/>
        <LinePlot/>
        <MarkPlot slotProps={{mark: {color: "black"}}}/>
        <ChartsXAxis label="X axis" position="bottom" axisId="x-linear-axis-id"/>
        <ChartsYAxis label="Y axis" position="left"/>
        <ChartsAxisHighlight x="line"/>
        <ChartsTooltip trigger="axis" slots={{axisContent: createTooltip(chartPoints)}}/>
    </ChartContainer>
};

export default Chart;

function createTooltip(points: IChartPoint[]): React.FC<ChartsAxisContentProps> {
    return (props) => {
        const {dataIndex} = props;
        const point = points[dataIndex];
        return (
            <Paper sx={{padding: 3, backgroundColor: "pink"}}>
                <Typography variant="body2">{point.name}</Typography>
                <br/>
                <Typography variant="caption">Height: {point.height}</Typography>
                <br/>
                <Typography variant="caption">Distance from start: {point.distanceFromStart}</Typography>
            </Paper>
        );
    };
}

const Background: React.FC<{ coloredColumns: [x1: number, x2: number, color: string][] }> = (p) => {
    const {left, top, width, height} = useDrawingArea();

    return <>
        {p.coloredColumns.map(([x1, x2, color], index) => {
            const columnLeft = left + (x1 / 100) * width;
            const columnWidth = ((x2 - x1) / 100) * width;

            return (
                <rect
                    key={index}
                    x={columnLeft}
                    y={top}
                    width={columnWidth}
                    height={height}
                    fill={color}
                />
            );
        })}
    </>;
}

const surfaceToColor: { [key in Surface]: string } = {
    [Surface.SAND]: 'brown',
    [Surface.ASPHALT]: 'pink',
    [Surface.GROUND]: 'gray',
}

const speedToColor: { [key in MaxSpeed]: string } = {
    [MaxSpeed.FAST]: 'red',
    [MaxSpeed.NORMAL]: 'yellow',
    [MaxSpeed.SLOW]: 'green',
}

function convertToChartData(points: IPoint[], tracks: ITrack[]): {
    pointSequences: [MaxSpeed, (IChartPoint | null)[]][],
    surfacesWithXCoordinates: [x1: number, x2: number, surface: Surface][],
    xValues: number[],
    chartPoints: IChartPoint[],
} {
    if (points.length === 0 || tracks.length === 0) {
        return {pointSequences: [], surfacesWithXCoordinates: [], xValues: [], chartPoints: []};
    }

    const chartPoints: IChartPoint[] = calculatePointDistance(points, tracks)
        .sort((a, b) => a[1] - b[1])
        .map(([point, distance]) => ({
            id: point.id,
            name: point.name,
            height: point.height,
            distanceFromStart: distance,
        }));

    const pointSequences: [MaxSpeed, (IChartPoint | null)[]][] = createPointsSequences(chartPoints, tracks);
    const surfacesWithXCoordinates = getSurfacesWithXCoordinates(chartPoints, tracks);
    const xValues = chartPoints.map(point => point.distanceFromStart);

    return {pointSequences, surfacesWithXCoordinates, xValues, chartPoints};
}

function createPointsSequences(points: IChartPoint[], tracks: ITrack[]): [MaxSpeed, (IChartPoint | null)[]][] {
    const sequences: [MaxSpeed, (IChartPoint | null)[]][] = [];
    const idToPointMap: { [key: number]: IChartPoint } = {};
    points.forEach(point => {
        idToPointMap[point.id] = point;
    });

    tracks.forEach(track => {
        const firstPoint = idToPointMap[track.firstId];
        const secondPoint = idToPointMap[track.secondId];

        if (!firstPoint || !secondPoint) {
            throw new Error(`First or second point not found for track [${JSON.stringify(track)}]`);
        }

        if (sequences.length === 0 || sequences[sequences.length - 1][0] !== track.maxSpeed) {
            sequences.push([track.maxSpeed, new Array(points.length).fill(null)]);
        }

        sequences[sequences.length - 1][1][points.indexOf(firstPoint)] = firstPoint;
        sequences[sequences.length - 1][1][points.indexOf(secondPoint)] = secondPoint;
    });

    return sequences;
}

function getSurfacesWithXCoordinates(points: IChartPoint[], tracks: ITrack[]): [x1: number, x2: number, surface: Surface][] {
    const surfaces: [number, number, Surface][] = [];
    const maxDistance = points[points.length - 1].distanceFromStart;
    const idToPointMap: { [key: number]: IChartPoint } = {};
    points.forEach(point => {
        idToPointMap[point.id] = point;
    });

    tracks.forEach(track => {
        const firstPoint = idToPointMap[track.firstId];
        const secondPoint = idToPointMap[track.secondId];

        if (!firstPoint || !secondPoint) {
            throw new Error(`First or second point not found for track [${JSON.stringify(track)}]`);
        }

        surfaces.push([
            firstPoint.distanceFromStart / maxDistance * 100,
            secondPoint.distanceFromStart / maxDistance * 100,
            track.surface,
        ]);
    });

    return surfaces;
}

function calculatePointDistance(points: IPoint[], tracksOrdered: ITrack[]): [IPoint, number][] {
    const pointToDistanceMap: { [key: number]: number } = {};
    points.forEach(point => {
        pointToDistanceMap[point.id] = 0;
    });

    const idToPointsMap: { [key: number]: IPoint } = {};
    points.forEach(point => {
        idToPointsMap[point.id] = point;
    });

    tracksOrdered.forEach(track => {
        const firstPoint = idToPointsMap[track.firstId];
        const secondPoint = idToPointsMap[track.secondId];

        if (!firstPoint || !secondPoint) {
            throw new Error(`First or second point not found for track [${JSON.stringify(track)}]`);
        }

        pointToDistanceMap[secondPoint.id] = pointToDistanceMap[firstPoint.id] + track.distance;
    });

    return points.map(point => [point, pointToDistanceMap[point.id]]);
}
