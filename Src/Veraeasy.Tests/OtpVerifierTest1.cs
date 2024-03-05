using Veraeasy.EmailVerification.Domain.Otp;
using Veraeasy.EmailVerification.Infrastructure.Otp;
using Veraeasy.Verifier.EmailVerifier.Service;

namespace Veraeasy.Tests;

public class OtpVerifierTest1
{
    [Fact]
    public void ShouldVerifyOtp()
    {
        IOtpService otpService = new OtpService();
        var secret = new Guid("42868d1a-2798-4a22-805b-4081adc5afb1");
        var code = otpService.generateOtp(secret.ToString());
        IOtpVerifier verifier = new OtpVerifier();
        Assert.True(verifier.validateOtp(secret.ToString(), int.Parse(code)));
    }
}