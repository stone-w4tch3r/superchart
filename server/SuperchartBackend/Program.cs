using NSwag.AspNetCore;
using Microsoft.EntityFrameworkCore;
using NSwag;
using NSwag.Generation.AspNetCore;
using SuperchartBackend;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ChartsDbContext>(opt => opt.UseInMemoryDatabase("ChartsDb"));
builder.Services.AddControllers();
builder.Services.AddScoped<Service>();
builder.Services.AddScoped<Repository>();
builder.Services.AddScoped<ChartNameHandler>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(ConfigureOpenApiDocs);
builder.Services.AddScoped<SwaggerBasicAuthMiddleware>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", b => b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

app.UseMiddleware<SwaggerBasicAuthMiddleware>();
app.UseOpenApi();
app.UseSwaggerUi(ConfigureSwaggerUI);
app.UseCors(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

if (app.Environment.IsDevelopment()) 
    app.UseDeveloperExceptionPage();

app.UseHttpsRedirection();
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
        Name = "Authorization",
        In = OpenApiSecurityApiKeyLocation.Header,
        Scheme = "basic",
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