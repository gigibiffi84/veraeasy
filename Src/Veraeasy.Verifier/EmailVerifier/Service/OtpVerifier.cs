using AspNetCore.Totp;

namespace Veraeasy.Verifier.EmailVerifier.Service;

public class OtpVerifier : IOtpVerifier
{
    public bool validateOtp(string secret, int code)
    {
        var generator = new TotpGenerator();

        var validator = new TotpValidator(generator);
        return validator.Validate(secret, code);
    }
}