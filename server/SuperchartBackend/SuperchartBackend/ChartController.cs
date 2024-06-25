using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace SuperchartBackend;

[ApiController]
[Route("[controller]")]
public class ChartsController(ChartsService chartsService) : ControllerBase
{
    [HttpPost]
    public ActionResult<ChartDTO> CreateRandomChart([FromQuery, Range(2, 200)] int pointsCount)
    {
        var (points, tracks, name) = chartsService.GenerateRandomChart(pointsCount);
        return Created("", MapToDTO(points, tracks, name)); //todo: uri
    }

    [HttpGet]
    public ActionResult<ChartDTO> GetChartByName([FromQuery] string name)
    {
        if (string.IsNullOrWhiteSpace(name) || !ChartsNameHandler.IsNameValid(name))
            return BadRequest("Invalid name provided");
        
        var result = chartsService.GetChartByName(name);
        if (result is null)
            return NotFound();
        var (points, tracks, actualName) = result.Value;
        return Ok(MapToDTO(points, tracks, actualName));
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