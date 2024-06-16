import {useState, useEffect} from 'react';
import {fetchMockRoute} from './generateMockRoute.ts';
import {Point, Track} from './types.ts';
import {fetchRoute} from "./api.ts";

export const useFetchRoute = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // fetchRoute()
        fetchMockRoute()
            .then(({routeDto: {points, tracks}}) => {
                setPoints(points);
                setTracks(tracks);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return {points, tracks, isLoading, error};
};
