namespace Veraeasy.ContactVerification.Data;
public interface IContactVerificationRepository
{
    Task<ContactVerification?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IAsyncEnumerable<ContactVerification>> ListByOwnerAsync(string owner, CancellationToken cancellationToken = default);
    Task AddAsync(ContactVerification contract, CancellationToken cancellationToken = default);
    Task CommitAsync(CancellationToken cancellationToken = default);
}