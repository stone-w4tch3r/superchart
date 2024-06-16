import {Point, Track} from './types.ts';
import {RouteDto} from "./fetchRouteFromApi.ts";

export const fetchMockRoute = async (): Promise<{ routeDto: RouteDto }> => {
    const points = generateRandomPoints();
    const tracks = generateTracksBetweenPoints(points);

    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 10000) + 1000));

    if (Math.random() < 0.1) {
        throw new Error('Failed to fetch route data');
    }

    return {routeDto: {points, tracks}};
};

function generateRandomPoints(): Point[] {
    const points: Point[] = [];
    const pointsCount = Math.floor(Math.random() * 10) + 1;
    for (let i = 0; i < pointsCount; i++) {
        points.push({
            id: i,
            name: `Point ${i}`,
            height: Math.floor(Math.random() * 1000),
        });
    }
    return points;
}

function generateTracksBetweenPoints(points: Point[]): Track[] {
    const tracks: Track[] = [];
    for (let i = 0; i < points.length - 1; i++) {
        const firstPoint = points[i];
        const secondPoint = points[i + 1];
        tracks.push({
            firstId: firstPoint.id,
            secondId: secondPoint.id,
            distance: Math.floor(Math.random() * 10),
            surface: Math.floor(Math.random() * 3),
            maxSpeed: Math.floor(Math.random() * 3),
        });
    }
    return tracks;
}