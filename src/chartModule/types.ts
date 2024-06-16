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

export interface Point {
    id: number;
    name: string;
    height: number;
}

export interface Track {
    firstId: number;
    secondId: number;
    distance: number;
    surface: Surface;
    maxSpeed: MaxSpeed;
}
