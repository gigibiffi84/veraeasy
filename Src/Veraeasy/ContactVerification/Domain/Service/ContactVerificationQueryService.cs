using MediatR;
using Veraeasy.ContactVerification.Domain.Queries;

namespace Veraeasy.ContactVerification.Domain.Service;

public class ContactVerificationQueryService(IMediator mediator) : IContactVerificationQueryService
{


    public async Task<Data.ContactVerification> GetContactVerificationbyId(string id)
     => await mediator.Send(new GetContactVerificationById(id));

}