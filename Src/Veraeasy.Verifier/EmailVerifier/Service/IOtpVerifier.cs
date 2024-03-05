namespace Veraeasy.Verifier.EmailVerifier.Service;

public interface IOtpVerifier
{
    bool validateOtp(string secret, int code);
}