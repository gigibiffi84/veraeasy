using MediatR;
using Veraeasy.ContactVerification.Domain.Queries;

namespace Veraeasy.ContactVerification.Domain.Service;

public class ContactVerificationQueryService(IMediator mediator) : IContactVerificationQueryService
{

    public async Task<Data.ContactVerification> GetContactVerificationbyId(string id)
     => await mediator.Send(new GetContactVerificationById(id));

    public async Task<IAsyncEnumerable<Data.ContactVerification>> ListContactVerificationByOwner(string owner)
   => await mediator.Send(new ListContactVerificationByOwner(owner));

}