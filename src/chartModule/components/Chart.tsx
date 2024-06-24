import React from 'react';
import {IPoint, ITrack, MaxSpeed, Surface} from "../types.ts";
import {BarPlot, ChartContainer, ChartsXAxis, LinePlot} from "@mui/x-charts";

interface ChartProps {
    data: { points: IPoint[], tracks: ITrack[] };
}

const Chart: React.FC<ChartProps> = ({data}) => {
    const [chartsBySpeed, barItems] = convertToSequences(data.points, data.tracks);
    const series = [
        {data: chartsBySpeed[MaxSpeed.FAST], type: 'line', color: maxSpeedToColor[MaxSpeed.FAST]},
    ];

    return <ChartContainer
        // dataset={[
        //     ...lineSequences.flatMap(s => ([
        //         {
        //             id: s.item1.id,
        //             name: s.item1.name,
        //             height: s.item1.height,
        //             distanceFromStart: s.item1.distanceFromStart,
        //             maxSpeed: s.maxSpeed,
        //             itemType: 'line'
        //         },
        //         {
        //             id: s.item2.id,
        //             name: s.item2.name,
        //             height: s.item2.height,
        //             distanceFromStart: s.item2.distanceFromStart,
        //             maxSpeed: s.maxSpeed,
        //             itemType: 'line'
        //         }
        //     ]))
        // ]}
        series={[
            // { dataKey: 'height'
            // {type: "bar", data: barItems.map(x => 1)},
        ]}
        xAxis={[
            {
                // dataKey: 'id',
                // data: line
                scaleType: 'linear',
                id: 'x-axis-id',
                ////@ts-expect-error ide fails to resolve barGapRatio
                // barGapRatio: 0.2,
                // categoryGapRatio: 0,
                // colorMap: {
                //     type: 'ordinal',
                //     values: data.points.map(p => p.id),
                //     colors: data.points.map(generateColorForPoint)
                // }
            }
        ]}
        width={800}
        height={400}
    >
        <BarPlot/>
        <LinePlot/>
        <ChartsXAxis label="X axis" position="bottom" axisId="x-axis-id"/>
    </ChartContainer>
};

export default Chart;

const surfaceToColor: { [key in Surface]: string } = {
    [Surface.SAND]: 'brown',
    [Surface.ASPHALT]: 'black',
    [Surface.GROUND]: 'green',
}

const maxSpeedToColor: { [key in MaxSpeed]: string } = {
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

interface IBarItem {
    surface: Surface;
}

function convertToSequences(points: IPoint[], tracks: ITrack[]):
    [{ [key in MaxSpeed]: (ILinePoint | null)[] }, IBarItem[]] {
    const tracksOrdered = tracks;//sortTracks(tracks);
    const pointsWithDistanceOrdered = calculatePointDistance(points, tracksOrdered)
        .sort((a, b) => a[1] - b[1]);


    const linePoints: ILinePoint[] = pointsWithDistanceOrdered
        .map(([point, distance]) => ({
            id: point.id,
            name: point.name,
            height: point.height,
            distanceFromStart: distance,
        }));

    const idToLinePointMap: { [key: number]: ILinePoint } = {};
    linePoints.forEach(point => {
        idToLinePointMap[point.id] = point;
    });

    const chartForSpeed: { [key in MaxSpeed]: (ILinePoint | null)[] } = {
        [MaxSpeed.FAST]: Array(linePoints.length).fill(null),
        [MaxSpeed.NORMAL]: Array(linePoints.length).fill(null),
        [MaxSpeed.SLOW]: Array(linePoints.length).fill(null),
    };
    tracksOrdered.forEach(track => {
        const firstPoint = idToLinePointMap[track.firstId];
        const secondPoint = idToLinePointMap[track.secondId];

        if (!firstPoint || !secondPoint) {
            throw new Error("Track has no first or second point");
        }

        const chart = chartForSpeed[track.maxSpeed];
        const firstPointIndex = linePoints.indexOf(firstPoint);
        const secondPointIndex = linePoints.indexOf(secondPoint);

        chart[firstPointIndex] = firstPoint;
        chart[secondPointIndex] = secondPoint;
    });

    const barItems: IBarItem[] = tracksOrdered.map(track => ({
        surface: track.surface,
    }));

    return [chartForSpeed, barItems];
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
    