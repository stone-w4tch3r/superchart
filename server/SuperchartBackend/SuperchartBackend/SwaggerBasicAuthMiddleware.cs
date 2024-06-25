using System.Net;

namespace SuperchartBackend;

public class SwaggerBasicAuthMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        if (!context.Request.Path.StartsWithSegments("/swagger"))
        {
            await next(context);
            return;
        }
        
        var username = Environment.GetEnvironmentVariable(EnvVars.SwaggerBasicAuthUsername) ?? "admin";
        var password = Environment.GetEnvironmentVariable(EnvVars.SwaggerBasicAuthPassword) ?? "admin";
        if (AuthHandler.IsRequestAuthorized(context.Request, username, password))
        {
            await next(context);
            return;
        }

        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
        context.Response.Headers.Append("WWW-Authenticate", "Basic realm=\"SuperchartBackend\", charset=\"UTF-8\"");
        await context.Response.WriteAsync("Unauthorized");
    }
}