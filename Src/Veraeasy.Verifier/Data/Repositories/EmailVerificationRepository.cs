using Veraeasy.Verifier.Data.Database;

namespace Veraeasy.Verifier.Data.Repositories;

internal sealed class EmailVerificationRepository(EmailVerificationDbContext persistence) : IEmailVerificationRepository
{
    public async Task<EmailVerificationProjection?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await persistence.Emails.FindAsync([id], cancellationToken);
    }

    public async Task<Guid> AddVerifiedEvent(EmailVerifierEvent verifiedEvent,
        CancellationToken cancellationToken = default)
    {
        var done = await persistence.VerifiedEvents.AddAsync(verifiedEvent, cancellationToken);
        await persistence.SaveChangesAsync(cancellationToken);
        return done.Entity.Id;
    }
}