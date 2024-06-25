using Microsoft.EntityFrameworkCore;

namespace SuperchartBackend;

public class ChartsDbContext(DbContextOptions<ChartsDbContext> options) : DbContext(options)
{
    public DbSet<ChartModel> Charts { get; init; }
    public DbSet<PointModel> Points { get; init; }
    public DbSet<TrackModel> Tracks { get; init; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // relationships
    }
}