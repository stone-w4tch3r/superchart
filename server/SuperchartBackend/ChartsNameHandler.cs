using Microsoft.EntityFrameworkCore;

namespace SuperchartBackend;

public class ChartsNameHandler(ChartsDbContext context)
{
    private static readonly string[] Adjectives =
    [
        "Fast",
        "Slow",
        "Normal",
        "Crazy",
        "Calm",
        "Sunny",
        "Rainy",
        "Snowy",
        "Hot",
        "Cold"
    ];

    private static readonly string[] Nouns =
    [
        "Road",
        "Track",
        "Path",
        "Street",
        "Highway",
        "Boulevard",
        "Avenue",
        "Lane",
        "Alley",
        "Way"
    ];
    
    public async Task<string> GenerateUniqueNameAsync()
    {
        string name;
        do
        {
            name = GenerateName();
        } while (await context.Set<ChartModel>().AnyAsync(c => c.Name == name));
        return name;
    }

    private static string GenerateName()
    {
        var random = new Random();
        var adjective = Adjectives[random.Next(Adjectives.Length)];
        var noun = Nouns[random.Next(Nouns.Length)];
        var number = random.Next(100);
        return $"{adjective}-{noun}-{number}";
    }

    public static bool IsNameValid(string name)
    {
        var parts = name.Split('-');
        return parts.Length == 3
               && Adjectives.Contains(parts[0])
               && Nouns.Contains(parts[1])
               && int.TryParse(parts[2], out var number)
               && number is >= 0 and < 100;
    }
}