namespace Veraeasy.Verifier.Data.Repositories;

public interface IEmailVerificationRepository
{
    Task<EmailVerificationProjection?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    Task<Guid> AddVerifiedEvent(EmailVerifierEvent verifiedeventEvent, CancellationToken cancellationToken = default);
}