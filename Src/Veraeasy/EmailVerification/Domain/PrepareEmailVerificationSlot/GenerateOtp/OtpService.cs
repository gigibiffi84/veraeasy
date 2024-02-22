using System.Security.Claims;
using AspNetCore.Totp;

namespace Veraeasy.EmailVerification.Domain.Otp;

public class OtpService : IOtpService
{
    public string generateOtp(string secret)
    {
        TotpGenerator generator = new TotpGenerator();
        var code =  generator.Generate(secret);
        return code.ToString();
    }
}