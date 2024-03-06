using Keycloak.AuthServices.Authentication;
using Veraeasy.EmailVerification.Domain.Model;
using Veraeasy.EmailVerification.Domain.PrepareEmailVerification;

namespace Veraeasy.EmailVerification.Infrastructure;

public class AuthService : IAuthService
{
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        ILogger<AuthService> logger,
        IConfiguration configuration,
        HttpClient httpClient)
    {
        _logger = logger;
        _configuration = configuration;
        _httpClient = httpClient;
    }


    public async Task<TokenResponse> generateAuthToken(UserCredentials credentials)
    {
        _logger.LogInformation($"creating new authetication for user {credentials.username}", credentials);
        var authConfig = _configuration
            .GetSection(KeycloakAuthenticationOptions.Section)
            .Get<KeycloakAuthenticationOptions>();
        var loginParams = new Dictionary<string, string>();
        loginParams.Add("grant_type", "password");
        loginParams.Add("client_id", "veraeasy-verify-otp");
        loginParams.Add("scope", "openid");
        loginParams.Add("username", credentials.username);
        loginParams.Add("password", credentials.password);

        var formContent = new FormUrlEncodedContent(loginParams);
        using var response = await _httpClient.PostAsync(
            $"{authConfig.AuthServerUrl}realms/veraeasy_ext/protocol/openid-connect/token",
            formContent);
        var token = await response.Content.ReadFromJsonAsync<TokenResponse>();
        return token;
    }
}