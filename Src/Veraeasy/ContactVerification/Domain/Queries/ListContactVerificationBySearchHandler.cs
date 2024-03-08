using Nelibur.ObjectMapper;
using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Data;
using Veraeasy.ContactVerification.Domain.Model;

namespace Veraeasy.ContactVerification.Domain.Queries;

public class ListContactVerificationBySearchHandler(IContactVerificationRepository? repository)
    : IQueryHandler<ListContactVerificationBySearch, List<ContactVerificationStatus>>

{
    public async Task<List<ContactVerificationStatus>> Handle(ListContactVerificationBySearch request,
        CancellationToken cancellationToken)
    {
        var list = await repository!.ListBySearchTermAsync(request.Term, cancellationToken);
        var events = list.SelectMany(e => e.Events);
        return events.Select(TinyMapper.Map<ContactVerificationStatus>).ToList();
    }
}