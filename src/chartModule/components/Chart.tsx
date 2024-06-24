import React from 'react';
import {IPoint, ITrack, MaxSpeed, Surface} from "../types.ts";
import {
    AllSeriesType,
    BarPlot, BarSeriesType,
    ChartContainer,
    ChartsAxisContentProps,
    ChartsAxisHighlight,
    ChartsTooltip,
    ChartsXAxis,
    ChartsYAxis,
    LinePlot,
    LineSeriesType,
    MarkPlot, useDrawingArea
} from "@mui/x-charts";
import Paper from "@mui/material/Paper";

interface ChartProps {
    data: { points: IPoint[], tracks: ITrack[] };
}

const Chart: React.FC<ChartProps> = ({data}) => {
    const {pointSequences, surfacesWithXCoordinates, xValues} = getDataForChart(data.points, data.tracks);

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
        <ChartsTooltip trigger="axis" slots={{axisContent: Tooltip}}/>
    </ChartContainer>
};

export default Chart;

const Tooltip: React.FC<ChartsAxisContentProps> = (props) => {
    const {axisData, dataIndex} = props;
    return (
        <Paper sx={{padding: 3, backgroundColor: "pink"}}>
            <p>{JSON.stringify(axisData.x) + " " + JSON.stringify(axisData.y) + " " + dataIndex}</p>
        </Paper>
    );
};

const Background: React.FC<{ coloredColumns: [x1: number, x2: number, color: string][] }> = (p) => {
    const {left, top, width, height} = useDrawingArea();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

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

interface ILinePoint {
    id: number;
    name: string;
    height: number;
    distanceFromStart: number;
}

function getDataForChart(points: IPoint[], tracks: ITrack[]): {
    pointSequences: [MaxSpeed, (ILinePoint | null)[]][],
    surfacesWithXCoordinates: [x1: number, x2: number, surface: Surface][],
    xValues: number[]
} {
    if (points.length === 0 || tracks.length === 0) {
        return {pointSequences: [], surfacesWithXCoordinates: [], xValues: []};
    }
    
    const linePoints: ILinePoint[] = calculatePointDistance(points, tracks)
        .sort((a, b) => a[1] - b[1])
        .map(([point, distance]) => ({
            id: point.id,
            name: point.name,
            height: point.height,
            distanceFromStart: distance,
        }));

    const pointSequences: [MaxSpeed, (ILinePoint | null)[]][] = createPointsSequences(linePoints, tracks);
    const surfacesWithXCoordinates = getSurfacesWithXCoordinates(linePoints, tracks);
    const xValues = linePoints.map(point => point.distanceFromStart);

    return {pointSequences, surfacesWithXCoordinates, xValues};
}

function createPointsSequences(points: ILinePoint[], tracks: ITrack[]): [MaxSpeed, (ILinePoint | null)[]][] {
    const sequences: [MaxSpeed, (ILinePoint | null)[]][] = [];
    const idToPointMap: { [key: number]: ILinePoint } = {};
    points.forEach(point => {
        idToPointMap[point.id] = point;
    });

    tracks.forEach(track => {
        const firstPoint = idToPointMap[track.firstId];
        const secondPoint = idToPointMap[track.secondId];

        if (!firstPoint || !secondPoint) {
            throw new Error("Track has no first or second point");
        }

        if (sequences.length === 0 || sequences[sequences.length - 1][0] !== track.maxSpeed) {
            sequences.push([track.maxSpeed, new Array(points.length).fill(null)]);
        }

        sequences[sequences.length - 1][1][points.indexOf(firstPoint)] = firstPoint;
        sequences[sequences.length - 1][1][points.indexOf(secondPoint)] = secondPoint;
    });

    return sequences;
}

function getSurfacesWithXCoordinates(points: ILinePoint[], tracks: ITrack[]): [x1: number, x2: number, surface: Surface][] {
    const surfaces: [number, number, Surface][] = [];
    const maxDistance = points[points.length - 1].distanceFromStart;
    const idToPointMap: { [key: number]: ILinePoint } = {};
    points.forEach(point => {
        idToPointMap[point.id] = point;
    });

    tracks.forEach(track => {
        const firstPoint = idToPointMap[track.firstId];
        const secondPoint = idToPointMap[track.secondId];

        if (!firstPoint || !secondPoint) {
            throw new Error("Track has no first or second point");
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
            throw new Error("Track has no first or second point");
        }

        pointToDistanceMap[secondPoint.id] = pointToDistanceMap[firstPoint.id] + track.distance;
    });

    return points.map(point => [point, pointToDistanceMap[point.id]]);
}

function sortTracks(tracks: ITrack[]): ITrack[] {
    const sortedTracks: ITrack[] = [];

    const secondIdToTrackMap: { [key: number]: ITrack } = {};
    tracks.forEach(track => {
        secondIdToTrackMap[track.secondId] = track;
    });

    const startingTrack = tracks.find(track => !secondIdToTrackMap[track.firstId]);
    if (!startingTrack) {
        throw new Error("No starting track found");
    }

    sortedTracks.push(startingTrack);

    while (sortedTracks.length < tracks.length) {
        const lastSortedTrack = sortedTracks[sortedTracks.length - 1];

        const nextTrack = tracks.find(track => track.firstId === lastSortedTrack.secondId);
        if (!nextTrack) {
            throw new Error("No next track found");
        }

        sortedTracks.push(nextTrack);
    }

    return sortedTracks;
}
