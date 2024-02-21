using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Data;

namespace Veraeasy.ContactVerification.Domain.Queries;

public class GetContactVerificationByIdHandler(IContactVerificationRepository? repository) : IQueryHandler<GetContactVerificationById, Data.ContactVerification>

{
    public async Task<Data.ContactVerification> Handle(GetContactVerificationById request, CancellationToken cancellationToken)
    {
    #pragma warning disable CS8602 // Dereferenziamento di un possibile riferimento Null.
    #pragma warning disable CS8603 // Possibile restituzione di riferimento Null.
        return await repository.GetByIdAsync(new Guid(request.Id), cancellationToken);
    #pragma warning restore CS8603 // Possibile restituzione di riferimento Null.
    #pragma warning restore CS8602 // Dereferenziamento di un possibile riferimento Null.


    }
}