using Veraeasy.ContactVerification.Domain.Model;

namespace Veraeasy.ContactVerification.Domain.Service;

public interface IContactVerificationQueryService
{
    Task<ContactVerificationStatus> GetContactVerificationbyId(string id);

    Task<ContactVerificationAddress> GetContactVerificationEmailbyId(string id);

    Task<IAsyncEnumerable<ContactVerificationStatus>> ListContactVerificationByOwner(string owner);
}