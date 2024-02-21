using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Data;

namespace Veraeasy.ContactVerification.Domain.Queries;

public class ListContactVerificationByOwnerHandler(IContactVerificationRepository? repository) : IQueryHandler<ListContactVerificationByOwner, IAsyncEnumerable<Data.ContactVerification>>

{
    public async Task<IAsyncEnumerable<Data.ContactVerification>> Handle(ListContactVerificationByOwner request, CancellationToken cancellationToken)
    {
       return await repository.ListByOwnerAsync(request.Owner);
    }
}