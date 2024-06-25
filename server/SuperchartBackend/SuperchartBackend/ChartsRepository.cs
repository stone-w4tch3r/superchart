using Microsoft.EntityFrameworkCore;

namespace SuperchartBackend;

public interface IChartRepository
{
    Task<ChartModel> SaveChartAsync(ChartModel chart);
    Task<ChartModel?> LoadChartAsync(string name);
}

//todo: finish
public class ChartsRepository(DbContext context) : IChartRepository
{
    public async Task<ChartModel> SaveChartAsync(ChartModel chart)
    {
        var chartModel = new ChartModel(
            Name: chart.Name,
            Points: chart.Points.Select(p => new PointModel(
                Id: 0, // todo: fix
                Name: p.Name,
                Height: p.Height
            )).ToArray(),
            Tracks: chart.Tracks.Select(t => new TrackModel(
                Id: 0, // todo: fix
                FirstPointId: t.FirstPointId,
                SecondPointId: t.SecondPointId,
                Distance: t.Distance,
                Surface: t.Surface,
                MaxSpeed: t.MaxSpeed
            )).ToArray()
        );

        await context.AddAsync(chartModel);
        await context.SaveChangesAsync();

        return chart;
    }

    public async Task<ChartModel?> LoadChartAsync(string name) //todo: encapsulate
    {
        var chartModel = await context.Set<ChartModel>()
            .Include(c => c.Points)
            .Include(c => c.Tracks)
            .FirstOrDefaultAsync(c => c.Name == name);

        if (chartModel is null)
            throw new ArgumentException("Chart not found");

        return new(
            chartModel.Name,
            chartModel.Points.Select(p => new PointModel(p.Id, p.Name, p.Height)).ToArray(),
            chartModel.Tracks.Select(t =>
                new TrackModel(t.Id, t.FirstPointId, t.SecondPointId, t.Distance, t.Surface, t.MaxSpeed)).ToArray()
        );
    }
}