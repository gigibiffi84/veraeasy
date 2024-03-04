using Nelibur.ObjectMapper;
using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Data;
using Veraeasy.ContactVerification.Domain.Model;

namespace Veraeasy.ContactVerification.Domain.Queries;

public class ListContactVerificationByOwnerHandler(IContactVerificationRepository? repository)
    : IQueryHandler<ListContactVerificationByOwner, IAsyncEnumerable<ContactVerificationStatus>>

{
    public async Task<IAsyncEnumerable<ContactVerificationStatus>> Handle(ListContactVerificationByOwner request,
        CancellationToken cancellationToken)
    {
        var list = await repository.ListByOwnerAsync(request.Owner);
        var asyncEnumerator = list.GetAsyncEnumerator();
        //await foreach (Data.ContactVerification item in list.WithCancellation(cancellationToken).ConfigureAwait(false))
        return GenerateEnum(asyncEnumerator);
    }

    private static async IAsyncEnumerable<ContactVerificationStatus> GenerateEnum(
        IAsyncEnumerator<Data.ContactVerification> asyncEnumerator)
    {
        while (await asyncEnumerator.MoveNextAsync())
        {
            var curr = asyncEnumerator.Current;
            var result = TinyMapper.Map<ContactVerificationStatus>(curr);
            result.Status = curr.Events.OrderByDescending(e => e.CreatedAt).FirstOrDefault().Status.ToString();

            yield return result;
        }
    }
}