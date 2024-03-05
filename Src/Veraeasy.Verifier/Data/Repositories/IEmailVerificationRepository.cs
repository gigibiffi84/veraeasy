namespace Veraeasy.Verifier.EmailVerification.Data.Repositories;

public interface IEmailVerificationRepository
{
    Task<EmailVerificationProjection?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
}