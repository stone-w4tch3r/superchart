import {useState, useEffect} from 'react';
import {generateMockRoute} from './generateMockRoute.ts';
import {IPoint, ITrack} from './types.ts';
import {fetchRandomRouteFromApi} from "./fetchRandomRouteFromApi.ts";

export const useFetchRoute = () => {
    const [points, setPoints] = useState<IPoint[]>([]);
    const [tracks, setTracks] = useState<ITrack[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRoute = () => {
        if (isLoading) {
            return;
        }
        
        setIsLoading(true);
        setError(null);
        fetchRandomRouteFromApi()
        // generateMockRoute()
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
