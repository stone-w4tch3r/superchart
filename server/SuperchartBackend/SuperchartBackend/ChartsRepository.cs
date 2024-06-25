using Microsoft.EntityFrameworkCore;

namespace SuperchartBackend;

public class ChartsRepository(ChartsDbContext context)
{
    public async Task<ChartModel> SaveChartAsync(ChartModel chart)
    {
        await context.AddAsync(chart);
        await context.SaveChangesAsync();

        return chart;
    }

    public async Task<ChartModel?> LoadChartAsync(string name)
    {
        return await context.Set<ChartModel>()
            .Include(c => c.Points)
            .Include(c => c.Tracks)
            .FirstOrDefaultAsync(c => c.Name == name);
    }

    public async Task<ChartModel[]> LoadAllChartsAsync()
    {
        var chartModels = await context.Set<ChartModel>()
            .Include(c => c.Points)
            .Include(c => c.Tracks)
            .ToArrayAsync();

        return chartModels;
    }

    public async Task DeleteAllDataAsync()
    {
        // foreach (var entity in context.ChangeTracker.Entries()) 
        //     entity.State = EntityState.Detached;
        
        // var charts = context.Charts.ToList();
        // foreach (var chart in charts) 
        //     context.Charts.Remove(chart);
        
        context.Tracks.RemoveRange(context.Tracks);
        context.Points.RemoveRange(context.Points);
        context.Charts.RemoveRange(context.Charts);

        await context.SaveChangesAsync();
    }
}