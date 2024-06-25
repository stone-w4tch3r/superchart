import {IPoint, ITrack} from './types.ts';
import {RouteDto} from "./fetchRandomRouteFromApi.ts";

export const generateMockRoute = async (): Promise<{ routeDto: RouteDto }> => {
    const points = generateRandomPoints();
    const tracks = generateTracksBetweenPoints(points);

    // const timeout = Math.floor(Math.random() * 10000) + 1000;
    const timeout = 0;
    await new Promise(resolve => setTimeout(resolve, timeout));

    if (Math.random() < 0.1) {
        throw new Error('Failed to fetch route data');
    }

    return {routeDto: {points, tracks}};
};

function generateRandomPoints(): IPoint[] {
    const points: IPoint[] = [];
    const pointsCount = Math.floor(Math.random() * 10) + 2;
    for (let i = 0; i < pointsCount; i++) {
        points.push({
            id: i,
            name: `Point ${i}`,
            height: Math.floor(Math.random() * 1000),
        });
    }
    return points;
}

function generateTracksBetweenPoints(points: IPoint[]): ITrack[] {
    const tracks: ITrack[] = [];
    for (let i = 0; i < points.length - 1; i++) {
        const firstPoint = points[i];
        const secondPoint = points[i + 1];
        tracks.push({
            firstId: firstPoint.id,
            secondId: secondPoint.id,
            distance: Math.floor(Math.random() * 10) + 1,
            surface: Math.floor(Math.random() * 3),
            maxSpeed: Math.floor(Math.random() * 3),
        });
    }
    return tracks;
}