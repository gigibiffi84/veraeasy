using Veraeasy.EmailVerification.Domain.PrepareEmailVerification;

namespace Veraeasy.EmailVerification.Controller;

public sealed record StartEmailVerificationRequest(
    string Email)
{
    public PrepareEmailVerificationCommand ToCommand()
    {
        return new PrepareEmailVerificationCommand(Email);
    }
}