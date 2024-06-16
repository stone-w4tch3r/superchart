import {useState, useEffect} from 'react';
import {fetchMockRoute} from './generateMockRoute.ts';
import {Point, Track} from './types.ts';
import {fetchRouteFromApi} from "./fetchRouteFromApi.ts";

export const useFetchRoute = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRoute = () => {
        if (isLoading) {
            return;
        }
        
        setIsLoading(true);
        setError(null);
        // fetchRouteFromApi()
        fetchMockRoute()
            .then(({routeDto}) => {
                setPoints(routeDto.points);
                setTracks(routeDto.tracks);
            })
            .catch((e) =>
                setError(e.message)
            )
            .finally(
                () => setIsLoading(false)
            );
    };

    return {points, tracks, isLoading, error, fetchRoute};
};
