using System.Security.Principal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace SuperchartBackend;

[AttributeUsage(AttributeTargets.Class)]
public class BasicAuthAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var username = Environment.GetEnvironmentVariable(EnvVars.BasicAuthUsername) ?? "admin";
        var password = Environment.GetEnvironmentVariable(EnvVars.BasicAuthPassword) ?? "admin";

        if (AuthHandler.IsRequestAuthorized(context.HttpContext.Request, username, password))
        {
            context.HttpContext.User = new GenericPrincipal(new GenericIdentity(username), null);
            return;
        }

        context.Result = new UnauthorizedResult();
    }
}