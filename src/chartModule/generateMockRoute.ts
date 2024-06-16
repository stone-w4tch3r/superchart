import {Point, Track, Surface, MaxSpeed} from './types.ts';
import {RouteDto} from "./api.ts";

export const fetchMockRoute = async (): Promise<{ routeDto: RouteDto }> => {
    const points: Point[] = [
        {id: 1, name: 'Point 1', height: 100},
        {id: 2, name: 'Point 2', height: 150},
        {id: 3, name: 'Point 3', height: 200},
    ];

    const tracks: Track[] = [
        {firstId: 1, secondId: 2, distance: 5, surface: Surface.ASPHALT, maxSpeed: MaxSpeed.NORMAL},
        {firstId: 2, secondId: 3, distance: 7, surface: Surface.GROUND, maxSpeed: MaxSpeed.SLOW},
    ];
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {routeDto: {points, tracks}};
};
