using Veraeasy.EmailVerification.Domain.PrepareEmailVerification;

namespace Veraeasy.EmailVerification.Controller;

public sealed record StartEmailVerificationRequest(
    string Email,
    string ContactId)
{
    public PrepareEmailVerificationCommand ToCommand(string owner)
    {
        return new PrepareEmailVerificationCommand(Email, owner, ContactId);
    }
}