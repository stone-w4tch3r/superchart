using System.ComponentModel.DataAnnotations;

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

public class ChartModel
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    private ChartModel()
#pragma warning restore CS8618
    {
    }

    public ChartModel(string name, PointModel[] points, TrackModel[] tracks)
    {
        Name = name;
        Points = points;
        Tracks = tracks;
    }

    public int Id { get; init; }
    [MaxLength(50)] public string Name { get; init; }
    public IList<PointModel> Points { get; init; }
    public IList<TrackModel> Tracks { get; init; }
}

public class PointModel(string name, double height)
{
    public int Id { get; init; }
    [MaxLength(50)] public string Name { get; init; } = name;
    public double Height { get; init; } = height;
}

public class TrackModel(
    int firstPointId,
    int secondPointId,
    double distance,
    Surface surface,
    MaxSpeed maxSpeed
)
{
    public int Id { get; init; }
    public int FirstPointId { get; init; } = firstPointId;
    public int SecondPointId { get; init; } = secondPointId;
    public double Distance { get; init; } = distance;
    public Surface Surface { get; init; } = surface;
    public MaxSpeed MaxSpeed { get; init; } = maxSpeed;
}