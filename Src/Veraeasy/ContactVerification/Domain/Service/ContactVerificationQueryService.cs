using MediatR;
using Veraeasy.ContactVerification.Domain.Model;
using Veraeasy.ContactVerification.Domain.Queries;

namespace Veraeasy.ContactVerification.Domain.Service;

public class ContactVerificationQueryService(IMediator mediator) : IContactVerificationQueryService
{
    public async Task<ContactVerificationStatus> GetContactVerificationbyId(string id)
    {
        return await mediator.Send(new GetContactVerificationById(id));
    }

    public async Task<List<ContactVerificationStatus>> ListContactVerificationBySearchTerm(string term)
    {
        return await mediator.Send(new ListContactVerificationBySearch(term));
    }

    public async Task<IAsyncEnumerable<ContactVerificationStatus>> ListContactVerificationByOwner(string owner)
    {
        return await mediator.Send(new ListContactVerificationByOwner(owner));
    }

    public async Task<ContactVerificationAddress> GetContactVerificationEmailbyId(string id)
    {
        return await mediator.Send(new GetContactVerificationEmailById(id));
    }
}