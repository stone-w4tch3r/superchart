import {useState} from 'react';
import {IPoint, ITrack} from './types.ts';
import {fetchRandomRouteFromApi} from "./fetchRandomRouteFromApi.ts";

export const useFetchRoute = (pointsCount: number) => {
    const [chartName, setChartName] = useState<string | null>(null);
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
        fetchRandomRouteFromApi(pointsCount)
            .then(({routeDto}) => {
                setPoints(routeDto.points);
                setTracks(routeDto.tracks);
                setChartName(routeDto.name);
            })
            .catch((e) =>
                setError(e.message)
            )
            .finally(
                () => setIsLoading(false)
            );
    };

    return {chartName, points, tracks, isLoading, error, fetchRoute};
};
