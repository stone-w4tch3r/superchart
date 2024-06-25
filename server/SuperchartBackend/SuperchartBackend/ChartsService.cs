using System.Transactions;

namespace SuperchartBackend;

public class ChartsService(ChartsRepository chartsRepository, ChartsNameHandler chartsNameHandler)
{
    public (PointModel[] Points, TrackModel[] Tracks, string Name) GenerateRandomChart(int pointsCount)
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
                firstPointId: i,
                secondPointId: i + 1,
                distance: random.NextDouble() * 1000,
                surface: (Surface)random.Next(3),
                maxSpeed: (MaxSpeed)random.Next(3)
            );

        var name = chartsNameHandler.GenerateUniqueNameAsync().GetAwaiter().GetResult(); //todo: async
        
        using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
        chartsRepository.SaveChartAsync(new(name, points, tracks)); //todo: async

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
    
    public async Task DeleteAllDataAsync()
    {
        using var scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled);
        await chartsRepository.DeleteAllDataAsync();
    }

    public async Task<ChartModel[]> LoadAllChartsAsync() => await chartsRepository.LoadAllChartsAsync();
}