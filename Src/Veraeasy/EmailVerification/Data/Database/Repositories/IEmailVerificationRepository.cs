namespace Veraeasy.EmailVerification.Data.Database.Repositories;

public interface IEmailVerificationRepository
{
    Task AddAsync(EmailVerificationEntity e, CancellationToken cancellationToken = default);

    Task CommitAsync(CancellationToken cancellationToken = default);

    Task<EmailVerificationEntity?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

}