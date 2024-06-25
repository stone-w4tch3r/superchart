using Microsoft.EntityFrameworkCore;

namespace SuperchartBackend;

public class ChartsDbContext(DbContextOptions<ChartsDbContext> options) : DbContext(options);