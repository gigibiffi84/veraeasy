using Veraeasy.EmailVerification.Domain.PrepareEmailVerification;

namespace Veraeasy.EmailVerification.Controller;

public sealed record StartEmailVerificationRequest(
    string Email,
    string CreatedAt)
{

    public PrepareEmailVerificationCommand ToCommand()
        => new(Email);

}

