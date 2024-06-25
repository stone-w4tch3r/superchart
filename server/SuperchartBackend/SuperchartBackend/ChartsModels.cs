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

// public class ChartModel(
//     int Id,
//     string Name,
//     List<PointModel> Points,
//     List<TrackModel> Tracks
// );
// 
// public record PointModel(
//     int Id,
//     string Name,
//     double Height
// );
// 
// public class TrackModel(
//     int Id,
//     int FirstPointId,
//     int SecondPointId,
//     double Distance,
//     Surface Surface,
//     MaxSpeed MaxSpeed,
//     PointModel FirstPoint,
//     PointModel SecondPoint
// );

public class ChartModel
{
    public ChartModel(string name, PointModel[] points, TrackModel[] tracks)
    {
        Name = name;
        Points = points;
        Tracks = tracks;
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public PointModel[] Points { get; set; }
    public TrackModel[] Tracks { get; set; }
}

public class PointModel
{
    public PointModel(string name, double height)
    {
        Name = name;
        Height = height;
    }

    public int Id { get; set; }
    public string Name { get; set; }
    public double Height { get; set; }
}

public class TrackModel
{
    public TrackModel(int firstPointId, int secondPointId, double distance, Surface surface, MaxSpeed maxSpeed)
    {
        FirstPointId = firstPointId;
        SecondPointId = secondPointId;
        Distance = distance;
        Surface = surface;
        MaxSpeed = maxSpeed;
    }

    public int Id { get; set; }
    public int FirstPointId { get; set; }
    public int SecondPointId { get; set; }
    public double Distance { get; set; }
    public Surface Surface { get; set; }
    public MaxSpeed MaxSpeed { get; set; }
    public PointModel FirstPoint { get; set; }
    public PointModel SecondPoint { get; set; }
}