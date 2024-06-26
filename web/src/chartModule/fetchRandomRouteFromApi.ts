import {IPoint, ITrack} from "./types.ts";

const API_URL = import.meta.env.VITE_API_URL;
const API_USER = import.meta.env.VITE_API_USER;
const API_PASS = import.meta.env.VITE_API_PASS;

export type RouteDto = {
    name: string;
    points: IPoint[];
    tracks: ITrack[];
};

export const fetchRandomRouteFromApi = async (pointsCount: number): Promise<{ routeDto: RouteDto }> => {
    const ROUTE = '/Charts/CreateRandomChart';
    const PARAM = 'pointsCount';
    const METHOD = 'POST';

    const apiUrl = new URL(API_URL + ROUTE);
    apiUrl.searchParams.append(PARAM, pointsCount.toString());

    const response = await fetch(apiUrl.toString(), {
        method: METHOD,
        headers: {'Authorization': authHeader,}
    });

    if (!response.ok) {
        throw new Error(`Request [${apiUrl}] failed with status ${response.status} (${response.statusText})`);
    }

    const data = await response.json();
    return {routeDto: data};
};

const authHeader = 'Basic ' + btoa(`${API_USER}:${API_PASS}`);