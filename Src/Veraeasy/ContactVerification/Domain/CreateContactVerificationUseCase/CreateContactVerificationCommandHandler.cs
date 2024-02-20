namespace Veraeasy.ContactVerification.Domain.CreateContactVerification;

using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Data;

[UsedImplicitly]
internal sealed class CreateContactVerificationCommandHandler
    (IContactVerificationRepository contractsRepository) : ICommandHandler<CreateContactVerificationCommand, Guid>
{
    public async Task<Guid> Handle(CreateContactVerificationCommand request, CancellationToken cancellationToken)
    {
          var cv = Veraeasy.ContactVerification.Data.ContactVerification.PrepareEntryWithDefaultExpire(
                    request.BusinessId,
                    request.Email,
                    request.MobileNumber,
                    DateTimeOffset.Parse(request.CreatedAt).UtcDateTime);
        await contractsRepository.AddAsync(cv);
        await contractsRepository.CommitAsync();
        return cv.Id;
    }
}
