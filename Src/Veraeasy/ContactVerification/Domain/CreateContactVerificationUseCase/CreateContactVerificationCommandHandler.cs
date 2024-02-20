using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Data;

namespace Veraeasy.ContactVerification.CreateContactVerification;


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
