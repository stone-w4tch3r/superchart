using System.Text;

namespace SuperchartBackend;

public static class AuthHandler
{
    public static bool IsRequestAuthorized(HttpRequest request, string username, string password)
    {
        var authHeader = request.Headers.Authorization.FirstOrDefault();
        if (authHeader is null || !authHeader.StartsWith("Basic "))
            return false;

        var encodedCredentials = authHeader["Basic ".Length..].Trim();
        var decodedCredentials = Encoding.UTF8.GetString(Convert.FromBase64String(encodedCredentials));
        var separatorIndex = decodedCredentials.IndexOf(':');
        if (separatorIndex == -1)
            return false;

        var requestUsername = decodedCredentials[..separatorIndex];
        var requestPassword = decodedCredentials[(separatorIndex + 1)..];

        return requestUsername == username && requestPassword == password;
    }
}