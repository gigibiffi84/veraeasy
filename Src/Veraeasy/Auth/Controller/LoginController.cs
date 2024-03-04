using Keycloak.AuthServices.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace Veraeasy.Auth.Controller;

[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;
    private readonly ILogger<LoginController> _logger;

    public LoginController(
        ILogger<LoginController> logger,
        IConfiguration configuration,
        HttpClient httpClient)
    {
        _logger = logger;
        _configuration = configuration;
        _httpClient = httpClient;
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserCredentials credentials)
    {
        _logger.LogInformation($"creating new authetication for user {credentials.username}", credentials);
        var authConfig = _configuration
            .GetSection(KeycloakAuthenticationOptions.Section)
            .Get<KeycloakAuthenticationOptions>();
        var loginParams = new Dictionary<string, string>();
        loginParams.Add("grant_type", "password");
        loginParams.Add("client_id", authConfig.Resource);
        loginParams.Add("scope", "openid");
        loginParams.Add("username", credentials.username);
        loginParams.Add("password", credentials.password);
        loginParams.Add("client_secret", authConfig.Credentials.Secret);
        var formContent = new FormUrlEncodedContent(loginParams);
        using var response = await _httpClient.PostAsync(
            $"{authConfig.AuthServerUrl}realms/master/protocol/openid-connect/token",
            formContent);
        var token = await response.Content.ReadFromJsonAsync<TokenResponse>();
        return Ok(token);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] TokenUserCredentials credentials)
    {
        var authConfig = _configuration
            .GetSection(KeycloakAuthenticationOptions.Section)
            .Get<KeycloakAuthenticationOptions>();
        var loginParams = new Dictionary<string, string>();
        loginParams.Add("grant_type", "refresh_token");
        loginParams.Add("client_id", authConfig.Resource);
        loginParams.Add("client_secret", authConfig.Credentials.Secret);
        loginParams.Add("refresh_token", credentials.refresh_token);
        var formContent = new FormUrlEncodedContent(loginParams);
        using var response = await _httpClient.PostAsync(
            $"{authConfig.AuthServerUrl}realms/master/protocol/openid-connect/token",
            formContent);
        var token = await response.Content.ReadFromJsonAsync<TokenResponse>();
        return Ok(token);
    }
}