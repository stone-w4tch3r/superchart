namespace SuperchartBackend;

public class ChartsService(ChartsRepository chartsRepository)
{
    public (PointModel[] Points, TrackModel[] Tracks, string Name) GenerateRandomChart(int pointsCount)
    {
        var points = new PointModel[pointsCount];
        var tracks = new TrackModel[pointsCount - 1];
        var random = new Random();

        for (var i = 0; i < pointsCount; i++)
            points[i] = new(
                Id: i,
                Name: $"Point {i}",
                Height: random.NextDouble() * 1000
            );

        for (var i = 0; i < pointsCount - 1; i++)
            tracks[i] = new
            (
                Id: i,
                FirstPointId: i,
                SecondPointId: i + 1,
                Distance: random.NextDouble() * 1000,
                Surface: (Surface)random.Next(3),
                MaxSpeed: (MaxSpeed)random.Next(3)
            );

        chartsRepository.SaveChartAsync(new("Random chart", points, tracks)); //todo: async

        return (points, tracks, "Random chart");
    }

    public (PointModel[] Points, TrackModel[] Tracks, string Name)? GetChartByName(string name)
    {
        var chart = chartsRepository.LoadChartAsync(name).GetAwaiter().GetResult(); //todo: async
        if (chart is null)
            return null;
        if (chart.Name != name)
            throw new InvalidOperationException(
                $"Error while loading chart by name. Expected: [{name}], actual: [{chart.Name}]"
            );
        return (chart.Points, chart.Tracks, chart.Name);
    }
}