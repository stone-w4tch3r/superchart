using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace SuperchartBackend;

[ApiController]
[BasicAuth]
[Route("[controller]/[action]")]
public class ChartsController(Service service) : ControllerBase
{
    /// <summary>
    /// Creates a random chart with the specified number of points.
    /// </summary>
    /// <param name="pointsCount">The number of points to generate. Must be between 2 and 200.</param>
    [HttpPost]
    public async Task<ActionResult<ChartDTO>> CreateRandomChart([FromQuery, Range(2, 200)] int pointsCount)
    {
        var (points, tracks, name) = await service.GenerateRandomChart(pointsCount);
        return CreatedAtAction(nameof(GetChartByName), new { name }, MapToDTO(points, tracks, name));
    }

    /// <summary>
    /// Retrieves a chart by its name.
    /// </summary>
    /// <param name="name">The name of the chart to retrieve.</param>
    [HttpGet]
    public async Task<ActionResult<ChartDTO>> GetChartByName([FromQuery] string name)
    {
        if (string.IsNullOrWhiteSpace(name) || !ChartNameHandler.IsNameValid(name))
            return BadRequest("Invalid name provided");

        var result = await service.GetChartByName(name);
        if (result is null)
            return NotFound();
        var (points, tracks, actualName) = result.Value;
        return Ok(MapToDTO(points, tracks, actualName));
    }

    /// <summary>
    /// Deletes all data from the database.
    /// </summary>
    [HttpDelete]
    public async Task<ActionResult> DeleteAllData()
    {
        await service.DeleteAllDataAsync();
        return NoContent();
    }

    /// <summary>
    /// Retrieves all charts from the database.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ChartDTO[]>> GetAllCharts()
    {
        var charts = await service.LoadAllChartsAsync();
        return Ok(charts.Select(c => MapToDTO(c.Points, c.Tracks, c.Name)).ToArray());
    }

    private static ChartDTO MapToDTO(PointModel[] points, TrackModel[] tracks, string name) =>
        new(
            name,
            points.Select(p => new PointDTO(p.Id, p.Name, p.Height)).ToArray(),
            tracks.Select(t => new TrackDTO(t.FirstPointId, t.SecondPointId, t.Distance, t.Surface, t.MaxSpeed))
                .ToArray()
        );
}

public record struct ChartDTO(
    string Name,
    PointDTO[] Points,
    TrackDTO[] Tracks
);

public record struct PointDTO(
    int Id,
    string Name,
    double Height
);

public record struct TrackDTO(
    int FirstId,
    int SecondId,
    double Distance,
    Surface Surface,
    MaxSpeed MaxSpeed
);