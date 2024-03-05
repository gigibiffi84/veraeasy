using AspNetCore.Totp;
using Veraeasy.EmailVerification.Domain.Otp;

namespace Veraeasy.EmailVerification.Infrastructure.Otp;

public class OtpService : IOtpService
{
    public string generateOtp(string secret)
    {
        var generator = new TotpGenerator();
        var code = generator.Generate(secret);
        return code.ToString();
    }
}