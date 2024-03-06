using Veraeasy.EmailVerification.Domain.Model;

namespace Veraeasy.EmailVerification.Domain.PrepareEmailVerification;

public interface IAuthService
{
    Task<TokenResponse> generateAuthToken(UserCredentials credentials);
}