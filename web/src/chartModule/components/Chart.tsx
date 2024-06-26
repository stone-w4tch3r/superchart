import React, {useMemo, useCallback} from 'react';
import {IPoint, ITrack, MaxSpeed, Surface} from "../types.ts";
import {
    AllSeriesType,
    ChartsAxisContentProps,
    ChartsAxisHighlight,
    ChartsTooltip,
    ChartsXAxis,
    ChartsYAxis,
    LinePlot,
    ResponsiveChartContainer,
    useDrawingArea
} from "@mui/x-charts";
import Paper from "@mui/material/Paper";
import {Typography} from "@mui/material";

interface IChartPoint {
    id: number;
    name: string;
    height: number;
    distanceFromStart: number;
}

const Chart: React.FC<{ points: IPoint[], tracks: ITrack[] }> = React.memo(({points, tracks}) => {
    const memoizedData = useMemo(() => {
        if (!points.length || !tracks.length) {
            return null;
        }
        return convertToChartData(points, tracks);
    }, [points, tracks]);

    const {pointSequences, surfacesWithXCoordinates, xValues, chartPoints} = memoizedData;

    const series = useMemo(() => pointSequences.map(([speed, points]) => ({
        data: points.map(point => point?.height),
        type: 'line',
        color: speedToColor[speed],
        curve: "linear",
    } as AllSeriesType)), [pointSequences]);

    const createTooltip = useCallback(({dataIndex}: ChartsAxisContentProps) => {
        const point = chartPoints[dataIndex];
        return <Paper sx={{padding: 3, backgroundColor: "pink"}}>
            <Typography variant="body2">{point.name}</Typography>
            <Typography variant="caption">Height: {point.height}</Typography>
            <br/>
            <Typography variant="caption">Distance from start: {point.distanceFromStart}</Typography>
        </Paper>;
    }, [chartPoints]);

    return <ResponsiveChartContainer
        series={series}
        xAxis={[{scaleType: 'linear', data: xValues, max: Math.max(...xValues), id: 'x-axis'}]}
    >
        {/*<OptimizedBackground coloredColumns={surfacesWithXCoordinates}/>*/}
        <LinePlot/>
        <ChartsXAxis label="X axis" position="bottom" axisId="x-axis"/>
        <ChartsYAxis label="Y axis" position="left"/>
        <ChartsAxisHighlight x="line"/>
        <ChartsTooltip trigger="axis" slots={{axisContent: createTooltip}}/>
    </ResponsiveChartContainer>;
});

export default Chart;

// const OptimizedBackground: React.FC<{
//     coloredColumns: [number, number, Surface][]
// }> = React.memo(({coloredColumns}) => {
//     const {left, top, width, height} = useDrawingArea();
//
//     const columnRects = useMemo(() => coloredColumns.map(([x1, x2, color], index) => {
//         const columnLeft = left + (x1 / 100) * width;
//         const columnWidth = ((x2 - x1) / 100) * width;
//         return <rect key={index} x={columnLeft} y={top} width={columnWidth} height={height} fill={"gray"}/>
//     }), [coloredColumns, left, top, width, height]);
//
//     return <>{columnRects.map((columnRect) => (
//         {columnRect}
//     ))}</>;
// });

const surfaceToColor: { [key in Surface]: string } = {
    [Surface.SAND]: 'brown',
    [Surface.ASPHALT]: 'pink',
    [Surface.GROUND]: 'gray',
};

const speedToColor: { [key in MaxSpeed]: string } = {
    [MaxSpeed.FAST]: 'red',
    [MaxSpeed.NORMAL]: 'yellow',
    [MaxSpeed.SLOW]: 'green',
};

const convertToChartData = (points: IPoint[], tracks: ITrack[]): {
    pointSequences: [MaxSpeed, (IChartPoint | null)[]][],
    surfacesWithXCoordinates: [number, number, Surface][],
    xValues: number[],
    chartPoints: IChartPoint[],
} => {
    const chartPoints = calculatePointDistance(points, tracks).map(([point, distance]) => ({
        id: point.id,
        name: point.name,
        height: point.height,
        distanceFromStart: distance,
    })).sort((a, b) => a.distanceFromStart - b.distanceFromStart);

    const pointSequences = createPointsSequences(chartPoints, tracks);
    const surfacesWithXCoordinates = getSurfacesWithXCoordinates(chartPoints, tracks);
    const xValues = chartPoints.map(point => point.distanceFromStart);

    return {pointSequences, surfacesWithXCoordinates, xValues, chartPoints};
};

const createPointsSequences = (points: IChartPoint[], tracks: ITrack[]): [MaxSpeed, (IChartPoint | null)[]][] => {
    const sequences: [MaxSpeed, (IChartPoint | null)[]][] = [];
    const idToPointMap = Object.fromEntries(points.map(point => [point.id, point]));

    tracks.forEach(track => {
        const firstPoint = idToPointMap[track.firstId];
        const secondPoint = idToPointMap[track.secondId];

        if (!firstPoint || !secondPoint) {
            throw new Error(`First or second point not found for track [${JSON.stringify(track)}]`);
        }

        if (!sequences.length || sequences[sequences.length - 1][0] !== track.maxSpeed) {
            sequences.push([track.maxSpeed, new Array(points.length).fill(null)]);
        }

        sequences[sequences.length - 1][1][points.indexOf(firstPoint)] = firstPoint;
        sequences[sequences.length - 1][1][points.indexOf(secondPoint)] = secondPoint;
    });

    return sequences;
};

const getSurfacesWithXCoordinates = (points: IChartPoint[], tracks: ITrack[]): [number, number, Surface][] => {
    const idToPointMap = Object.fromEntries(points.map(point => [point.id, point]));
    const maxDistance = points[points.length - 1].distanceFromStart;

    return tracks.map(track => {
        const firstPoint = idToPointMap[track.firstId];
        const secondPoint = idToPointMap[track.secondId];

        if (!firstPoint || !secondPoint) {
            throw new Error(`First or second point not found for track [${JSON.stringify(track)}]`);
        }

        return [
            (firstPoint.distanceFromStart / maxDistance) * 100,
            (secondPoint.distanceFromStart / maxDistance) * 100,
            track.surface,
        ];
    });
};

const calculatePointDistance = (points: IPoint[], tracksOrdered: ITrack[]): [IPoint, number][] => {
    const pointToDistanceMap: { [key: number]: number } = {};
    const idToPointsMap = Object.fromEntries(points.map(point => [point.id, point]));

    points.forEach(point => {
        pointToDistanceMap[point.id] = 0;
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
};
