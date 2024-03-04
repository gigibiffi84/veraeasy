using Nelibur.ObjectMapper;
using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Data;
using Veraeasy.ContactVerification.Domain.Model;

namespace Veraeasy.ContactVerification.Domain.Queries;

public class GetContactVerificationByIdHandler(IContactVerificationRepository? repository)
    : IQueryHandler<GetContactVerificationById, ContactVerificationStatus>

{
    public async Task<ContactVerificationStatus> Handle(GetContactVerificationById request,
        CancellationToken cancellationToken)
    {
#pragma warning disable CS8602 // Dereferenziamento di un possibile riferimento Null.
#pragma warning disable CS8603 // Possibile restituzione di riferimento Null.
        var byIdAsync = await repository.GetByIdAsync(new Guid(request.Id), cancellationToken);
        var result = TinyMapper.Map<ContactVerificationStatus>(byIdAsync);
        result.Status = byIdAsync.Events.OrderByDescending(e => e.CreatedAt).FirstOrDefault().Status.ToString();
        return result;
#pragma warning restore CS8603 // Possibile restituzione di riferimento Null.
#pragma warning restore CS8602 // Dereferenziamento di un possibile riferimento Null.
    }
}