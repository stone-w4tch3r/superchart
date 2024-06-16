import {Point, Track} from "./types.ts";

const API_URL = 'http://your-backend-url/api/routes';

export type RouteDto = {
    points: Point[];
    tracks: Track[];
};

export const fetchRouteFromApi = async (): Promise<{ routeDto: RouteDto }> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch route data');
    }
    return response.json();
};
