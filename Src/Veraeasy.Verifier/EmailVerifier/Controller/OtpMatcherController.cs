using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Veraeasy.Verifier.Email.Controller;

[ApiController]
[ApiVersion(1.0)]
[Route("api/[controller]")]
public class OtpMatcherController(
    ILogger<OtpMatcherController> logger,
    IHttpContextAccessor httpContextAccessor
) : ControllerBase
{
    [HttpGet("test")]
    [Authorize(Policy = "IsOtpMatcher")]
    public async Task<IActionResult> testRole()
    {
        var identity = httpContextAccessor.HttpContext.User.Identity;
        logger.LogInformation("{@User}", identity.Name);
        return Ok("ok");
    }
}