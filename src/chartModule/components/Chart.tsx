import React from 'react';
import {IPoint, ITrack, MaxSpeed, Surface} from "../types.ts";
import {
    BarPlot,
    ChartContainer,
    ChartsAxisContentProps,
    ChartsAxisHighlight,
    ChartsTooltip,
    ChartsXAxis,
    ChartsYAxis,
    LinePlot,
    LineSeriesType,
    MarkPlot
} from "@mui/x-charts";
import Paper from "@mui/material/Paper";

interface ChartProps {
    data: { points: IPoint[], tracks: ITrack[] };
}

const Chart: React.FC<ChartProps> = ({data}) => {
    const [pointSequences, barItems, xValues] = getDataForChart(data.points, data.tracks);
    
    const series = pointSequences.map(([speed, points]) => ({
        data: points.map(point => point?.height),
        type: 'line',
        color: speedToColor[speed],
        curve: "linear"
    }));

    return <ChartContainer
        series={series as LineSeriesType[]}
        xAxis={[
            {
                data: xValues,
                scaleType: 'linear',
                id: 'x-axis-id',
                ////@ts-expect-error ide fails to resolve barGapRatio
                // barGapRatio: 0.2,
                // categoryGapRatio: 0,

            }
        ]}
        width={800}
        height={400}
    >
        <BarPlot/>
        <LinePlot/>
        <MarkPlot slotProps={{mark: {color: "black"}}}/>
        <ChartsXAxis label="X axis" position="bottom" axisId="x-axis-id"/>
        <ChartsYAxis label="Y axis" position="left"/>
        <ChartsAxisHighlight x="line"/>
        <ChartsTooltip trigger="axis" slots={{axisContent: Tooltip}}/>
    </ChartContainer>
};

const Tooltip = (props: ChartsAxisContentProps) => {
    const {axisData, dataIndex} = props;
    return (
        <Paper sx={{padding: 3, backgroundColor: "pink"}}>
            <p>{JSON.stringify(axisData.x) + " " + JSON.stringify(axisData.y) + " " + dataIndex}</p>
        </Paper>
    );
};

export default Chart;

const surfaceToColor: { [key in Surface]: string } = {
    [Surface.SAND]: 'brown',
    [Surface.ASPHALT]: 'black',
    [Surface.GROUND]: 'green',
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

function getDataForChart(points: IPoint[], tracks: ITrack[]): [
    pointSequences: [MaxSpeed, (ILinePoint | null)[]][],
    surfaces: Surface[],
    xValues: number[]
] {
    const linePoints: ILinePoint[] = calculatePointDistance(points, tracks)
        .sort((a, b) => a[1] - b[1])
        .map(([point, distance]) => ({
            id: point.id,
            name: point.name,
            height: point.height,
            distanceFromStart: distance,
        }));

    const pointSequences: [MaxSpeed, (ILinePoint | null)[]][] = createPointsSequences(linePoints, tracks);
    const surfaces = tracks.map(track => track.surface);
    const xValues = linePoints.map(point => point.distanceFromStart);

    return [pointSequences, surfaces, xValues];
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
