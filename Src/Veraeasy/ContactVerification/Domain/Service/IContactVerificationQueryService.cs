namespace Veraeasy.ContactVerification.Domain.Service;

public interface IContactVerificationQueryService
{
    Task<Data.ContactVerification> GetContactVerificationbyId(string id);

    Task<IAsyncEnumerable<Data.ContactVerification>> ListContactVerificationByOwner(string owner);


}