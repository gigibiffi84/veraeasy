using Nelibur.ObjectMapper;
using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Data;
using Veraeasy.ContactVerification.Domain.Model;

namespace Veraeasy.ContactVerification.Domain.Queries;

public class GetContactVerificationByIdHandler(IContactVerificationRepository? repository)
    : IQueryHandler<GetContactVerificationById, ContactVerificationStatus>,
        IQueryHandler<GetContactVerificationEmailById, ContactVerificationAddress>

{
    public async Task<ContactVerificationStatus> Handle(GetContactVerificationById request,
        CancellationToken cancellationToken)
    {
        var byIdAsync = await repository.GetByIdAsync(new Guid(request.Id), cancellationToken);
        var result = TinyMapper.Map<ContactVerificationStatus>(byIdAsync);
        result.Status = byIdAsync.Events.OrderByDescending(e => e.CreatedAt).FirstOrDefault().Status.ToString();
        return result;
    }

    public async Task<ContactVerificationAddress> Handle(GetContactVerificationEmailById request,
        CancellationToken cancellationToken)
    {
        var byIdAsync = await repository.GetByIdWithoutEventsAsync(new Guid(request.Id), cancellationToken);
        var result = TinyMapper.Map<ContactVerificationAddress>(byIdAsync);
        return result;
    }
}