using Microsoft.AspNetCore.Mvc;

namespace Veraeasy.Auth.Controller;

[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<LoginController> _logger;

    public LoginController(
        ILogger<LoginController> logger,
        HttpClient httpClient)
    {
        _logger = logger;
        _httpClient = httpClient;
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserCredentials credentials)
    {
        _logger.LogInformation($"creating new authetication for user {credentials.username}", credentials);
        var loginParams = new Dictionary<string, string>();
        loginParams.Add("grant_type", "password");
        loginParams.Add("client_id", "veraeasy-app-dev");
        loginParams.Add("scope", "openid");
        loginParams.Add("username", credentials.username);
        loginParams.Add("password", credentials.password);
        loginParams.Add("client_secret", "XfyZc1pDo5TLmgpwjVxx0uzEqrCBKMsA");
        var formContent = new FormUrlEncodedContent(loginParams);
        var response = await _httpClient.PostAsync(
            "http://localhost:8080/realms/master/protocol/openid-connect/token",
            formContent);
        var token = await response.Content.ReadFromJsonAsync<TokenResponse>();
        return Ok(token);
    }
}