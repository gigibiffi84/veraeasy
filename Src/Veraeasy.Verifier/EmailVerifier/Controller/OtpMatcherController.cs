using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Veraeasy.Verifier.EmailVerification.Data.Repositories;
using Veraeasy.Verifier.EmailVerifier.Controller;
using Veraeasy.Verifier.EmailVerifier.Service;

namespace Veraeasy.Verifier.Email.Controller;

[ApiController]
[ApiVersion(1.0)]
[Route("api/[controller]")]
public class OtpMatcherController(
    ILogger<OtpMatcherController> logger,
    IHttpContextAccessor httpContextAccessor,
    IEmailVerificationRepository emailVerificationRepository,
    IOtpVerifier otpVerifier
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

    [HttpGet("getEmailVerificationByUuuid")]
    [Authorize(Policy = "IsOtpMatcher")]
    public async Task<IActionResult> getEmailVerificationByUuuid([FromQuery(Name = "uuid")] string uuid)
    {
        var identity = httpContextAccessor.HttpContext.User.Identity;
        logger.LogInformation("{@User}", identity.Name);
        var verification = await emailVerificationRepository.GetByIdAsync(new Guid(uuid));

        return Ok("ok");
    }

    [HttpPut("verifyOtp")]
    [Authorize(Policy = "IsOtpMatcher")]
    public async Task<IActionResult> getEmailVerificationByUuuid([FromBody] VerifyOtpRequest request)
    {
        var identity = httpContextAccessor.HttpContext.User.Identity;
        logger.LogInformation("{@User}", identity.Name);
        var verification = await emailVerificationRepository.GetByIdAsync(new Guid(request.uuid));

        otpVerifier.validateOtp(verification?.Secret, int.Parse(request.Otp));
        return Ok("ok");
    }
}