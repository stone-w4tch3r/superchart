using Microsoft.EntityFrameworkCore;

namespace SuperchartBackend;

public class ChartsDbContext(DbContextOptions<ChartsDbContext> options) : DbContext(options)
{
    public DbSet<PointModel> Charts { get; init; }
    public DbSet<PointModel> Points { get; init; }
    public DbSet<TrackModel> Tracks { get; init; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ChartModel>()
            .HasMany(c => c.Points)
            .WithOne();

        modelBuilder.Entity<ChartModel>()
            .HasMany(c => c.Tracks)
            .WithOne();

        modelBuilder.Entity<TrackModel>()
            .HasOne<PointModel>()
            .WithMany()
            .HasForeignKey(t => t.FirstPointId);

        modelBuilder.Entity<TrackModel>()
            .HasOne<PointModel>()
            .WithMany()
            .HasForeignKey(t => t.SecondPointId);
    }
}