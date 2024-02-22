namespace Veraeasy.EmailVerification.Domain.Otp;


public interface IOtpService
{
    string generateOtp(string secret);
}