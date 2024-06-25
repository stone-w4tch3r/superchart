import {IPoint, ITrack} from "./types.ts";

const BASE_URL = 'http://localhost:5234';
const BASE_AUTH_USER = 'admin';
const BASE_AUTH_PASS = 'admin';

export type RouteDto = {
    name: string;
    points: IPoint[];
    tracks: ITrack[];
};

export const fetchRandomRouteFromApi = async (pointsCount: number = 11): Promise<{ routeDto: RouteDto }> => {
    const ROUTE = '/Charts/CreateRandomChart';
    const PARAM = 'pointsCount';
    const METHOD = 'POST';

    const apiUrl = new URL(BASE_URL + ROUTE);
    apiUrl.searchParams.append(PARAM, pointsCount.toString());

    const response = await fetch(apiUrl.toString(), {
        method: METHOD,
        headers: authHeader,
    });

    if (!response.ok) {
        throw new Error(`Request [${apiUrl}] failed with status ${response.status} (${response.statusText})`);
    }

    const data = await response.json();
    return {routeDto: data};
};

const authHeader = {
    'Authorization': 'Basic ' + btoa(`${BASE_AUTH_USER}:${BASE_AUTH_PASS}`),
};