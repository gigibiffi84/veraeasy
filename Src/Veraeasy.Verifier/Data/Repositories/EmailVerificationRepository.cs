using Veraeasy.Verifier.EmailVerification.Data.Repositories;

namespace Veraeasy.Verifier.EmailVerification.Data.Database.Repositories;

internal sealed class EmailVerificationRepository(EmailVerificationDbContext persistence) : IEmailVerificationRepository
{
    public async Task<EmailVerificationProjection?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        return await persistence.Emails.FindAsync([id], cancellationToken);
    }
}