import {IPoint, ITrack} from "./types.ts";

const API_URL = 'http://your-backend-url/api/routes';

export type RouteDto = {
    points: IPoint[];
    tracks: ITrack[];
};

export const fetchRouteFromApi = async (): Promise<{ routeDto: RouteDto }> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch route data');
    }
    return response.json();
};
