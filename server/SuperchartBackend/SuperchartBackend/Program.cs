using NSwag.AspNetCore;
using Microsoft.EntityFrameworkCore;
using NSwag;
using NSwag.Generation.AspNetCore;
using SuperchartBackend;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ChartsDbContext>(opt => opt.UseInMemoryDatabase("ChartsDb"));
builder.Services.AddControllers();
builder.Services.AddScoped<ChartsService>();
builder.Services.AddScoped<ChartsRepository>();
builder.Services.AddScoped<ChartsNameHandler>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(ConfigureOpenApiDocs);

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(ConfigureSwaggerUI);
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
return;

static void ConfigureOpenApiDocs(AspNetCoreOpenApiDocumentGeneratorSettings config)
{
    config.DocumentName = "Superchart";
    config.Title = "Superchart v1";
    config.Version = "v1";
    
    config.AddSecurity("Basic", [], new()
    {
        Type = OpenApiSecuritySchemeType.Basic,
        Description = "Input your username and password to access this API",
    });
}

static void ConfigureSwaggerUI(SwaggerUiSettings config)
{
    config.DocumentTitle = "Superchart";
    config.Path = "/swagger";
    config.DocumentPath = "/swagger/{documentName}/swagger.json";
    config.DocExpansion = "list";
}