using System.Net;

namespace SuperchartBackend;

public class SwaggerBasicAuthMiddleware(RequestDelegate next)
{
    private readonly RequestDelegate _next = next;

    public async Task Invoke(HttpContext context)
    {
        var username = Environment.GetEnvironmentVariable(EnvVars.SwaggerBasicAuthUsername) ?? "admin";
        var password = Environment.GetEnvironmentVariable(EnvVars.SwaggerBasicAuthPassword) ?? "admin";
        if (AuthHandler.IsRequestAuthorized(context.Request, username, password))
        {
            await _next(context);
            return;
        }

        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
        await context.Response.WriteAsync("Unauthorized");
    }
}