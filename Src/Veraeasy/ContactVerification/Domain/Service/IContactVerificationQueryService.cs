using Veraeasy.ContactVerification.Domain.Model;

namespace Veraeasy.ContactVerification.Domain.Service;

public interface IContactVerificationQueryService
{
    Task<ContactVerificationStatus> GetContactVerificationbyId(string id);

    Task<ContactVerificationAddress> GetContactVerificationEmailbyId(string id);

    Task<List<ContactVerificationStatus>> ListContactVerificationBySearchTerm(string term);

    Task<IAsyncEnumerable<ContactVerificationStatus>> ListContactVerificationByOwner(string owner);
}