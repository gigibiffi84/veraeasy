using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Veraeasy.Verifier.Data;
using Veraeasy.Verifier.Data.Repositories;
using Veraeasy.Verifier.EmailVerifier.Service;

namespace Veraeasy.Verifier.EmailVerifier.Controller;

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
    public async Task<IActionResult> GetEmailVerificationByUuuid([FromQuery(Name = "uuid")] string uuid)
    {
        var identity = httpContextAccessor.HttpContext.User.Identity;
        logger.LogInformation("{@User}", identity.Name);
        var verification = await emailVerificationRepository.GetByIdAsync(new Guid(uuid));
        var result = new EmailVerifierResponse(
            verification!.EmailAddress,
            verification.AuthToken,
            verification.CreatedAt);
        return Ok(result);
    }

    [HttpPut("verifyOtp")]
    [Authorize(Policy = "IsOtpMatcher")]
    public async Task<IActionResult> PutEmailVerification([FromBody] VerifyOtpRequest request)
    {
        var identity = httpContextAccessor.HttpContext.User.Identity;
        logger.LogInformation("{@User}", identity.Name);
        var verification = await emailVerificationRepository.GetByIdAsync(new Guid(request.uuid));
        if (verification == null) return NotFound();

        var valid = otpVerifier.validateOtp(verification?.Secret, int.Parse(request.Otp));
        if (valid)
        {
            var created = await emailVerificationRepository.AddVerifiedEvent(
                EmailVerifierEvent.createEvent(verification.EmailAddress, verification.Id.ToString()));
            return NoContent();
        }

        return Conflict();
    }
}