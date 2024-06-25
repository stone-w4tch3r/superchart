using NSwag.AspNetCore;
using Microsoft.EntityFrameworkCore;
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
// app.UseAuthorization();
app.MapControllers();

app.Run();
return;

static void ConfigureOpenApiDocs(AspNetCoreOpenApiDocumentGeneratorSettings config)
{
    config.DocumentName = "TodoAPI";
    config.Title = "TodoAPI v1";
    config.Version = "v1";
}

static void ConfigureSwaggerUI(SwaggerUiSettings config)
{
    config.DocumentTitle = "TodoAPI";
    config.Path = "/swagger";
    config.DocumentPath = "/swagger/{documentName}/swagger.json";
    config.DocExpansion = "list";
}