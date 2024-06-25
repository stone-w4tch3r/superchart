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
#pragma warning disable CS8618
    // ReSharper disable once UnusedMember.Local
    private ChartModel()
#pragma warning restore CS8618
    {
    }

    public ChartModel(string name, IList<PointModel> points, IList<TrackModel> tracks)
    {
        Name = name;
        Points = points;
        Tracks = tracks;
    }

    public int Id { get; init; }
    [MaxLength(50)] public string Name { get; init; }
    public IList<PointModel> Points { get; init; } = new List<PointModel>();
    public IList<TrackModel> Tracks { get; init; } = new List<TrackModel>();
}

public class PointModel
{
#pragma warning disable CS8618
    // ReSharper disable once UnusedMember.Local
    private PointModel()
#pragma warning restore CS8618
    {
    }

    public PointModel(string name, double height)
    {
        Name = name;
        Height = height;
    }

    public int Id { get; init; }
    [MaxLength(50)] public string Name { get; init; }
    public double Height { get; init; }
}

public class TrackModel
{
#pragma warning disable CS8618
    // ReSharper disable once UnusedMember.Local
    private TrackModel()
#pragma warning restore CS8618
    {
    }

    public TrackModel(PointModel firstPoint, PointModel secondPoint, double distance, Surface surface,
        MaxSpeed maxSpeed)
    {
        FirstPoint = firstPoint;
        SecondPoint = secondPoint;
        Distance = distance;
        Surface = surface;
        MaxSpeed = maxSpeed;
    }

    public int Id { get; init; }
    public PointModel FirstPoint { get; init; }
    public PointModel SecondPoint { get; init; }
    public double Distance { get; init; }
    public Surface Surface { get; init; }
    public MaxSpeed MaxSpeed { get; init; }
}