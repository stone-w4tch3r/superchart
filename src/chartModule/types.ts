export enum Surface {
    SAND,
    ASPHALT,
    GROUND,
}

export enum MaxSpeed {
    FAST,
    NORMAL,
    SLOW,
}

export interface IPoint {
    id: number;
    name: string;
    height: number;
}

export interface ITrack {
    firstId: number;
    secondId: number;
    distance: number;
    surface: Surface;
    maxSpeed: MaxSpeed;
}
