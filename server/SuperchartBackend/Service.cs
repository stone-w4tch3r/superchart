using System.Transactions;

namespace SuperchartBackend;

public class Service(Repository repository, ChartNameHandler chartNameHandler)
{
    public async Task<(PointModel[] Points, TrackModel[] Tracks, string Name)> GenerateRandomChart(int pointsCount)
    {
        var points = new PointModel[pointsCount];
        var tracks = new TrackModel[pointsCount - 1];
        var random = new Random();

        for (var i = 0; i < pointsCount; i++)
            points[i] = new(
                name: $"Point {i}",
                height: random.NextDouble() * 1000
            );

        for (var i = 0; i < pointsCount - 1; i++)
            tracks[i] = new
            (
                firstPoint: points[i],
                secondPoint: points[i + 1],
                distance: random.NextDouble() * 1000,
                surface: (Surface)random.Next(3),
                maxSpeed: (MaxSpeed)random.Next(3)
            );

        var name = await chartNameHandler.GenerateUniqueNameAsync();

        using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
        await repository.SaveChartAsync(new(name, points, tracks));

        return (points, tracks, name);
    }

    public async Task<(PointModel[] Points, TrackModel[] Tracks, string Name)?> GetChartByName(string name)
    {
        var chart = await repository.LoadChartAsync(name);
        if (chart is null)
            return null;
        if (chart.Name != name)
            throw new InvalidOperationException(
                $"Error while loading chart by name. Expected: [{name}], actual: [{chart.Name}]"
            );

        return (chart.Points.ToArray(), chart.Tracks.ToArray(), chart.Name);
    }

    public async Task DeleteAllDataAsync()
    {
        using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
        await repository.DeleteAllDataAsync();
    }

    public async Task<(PointModel[] Points, TrackModel[] Tracks, string Name)[]> LoadAllChartsAsync()
    {
        var charts = await repository.LoadAllChartsAsync();
        return charts.Select(c => (c.Points.ToArray(), c.Tracks.ToArray(), c.Name)).ToArray();
    }
}