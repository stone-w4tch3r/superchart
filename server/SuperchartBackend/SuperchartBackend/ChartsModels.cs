namespace SuperchartBackend;

public enum Surface
{
    Sand,
    Asphalt,
    Ground
}

public enum MaxSpeed
{
    Fast,
    Normal,
    Slow
}

public record PointModel(
    int Id,
    string Name,
    double Height
);

public record TrackModel(
    int Id,
    int FirstPointId,
    int SecondPointId,
    double Distance,
    Surface Surface,
    MaxSpeed MaxSpeed
);

public record ChartModel(
    string Name,
    PointModel[] Points,
    TrackModel[] Tracks
);