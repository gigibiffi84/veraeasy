namespace Veraeasy.ContactVerification.Domain.CreateContactVerification;

using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Data;

[UsedImplicitly]
internal sealed class CreateContactVerificationCommandHandler
    (IContactVerificationRepository contractsRepository, ILogger<CreateContactVerificationCommandHandler> logger) : ICommandHandler<CreateContactVerificationCommand, Guid>
{
    public async Task<Guid> Handle(CreateContactVerificationCommand cmd, CancellationToken cancellationToken)
    {
          logger.LogInformation($"Received command {cmd.GetType().Name} from {cmd.User?.Identity?.Name}");
          var cv = Veraeasy.ContactVerification.Data.ContactVerification.PrepareEntryWithDefaultExpire(
                    cmd.BusinessId,
                    cmd.Email,
                    cmd.MobileNumber,
                    DateTimeOffset.Parse(cmd.CreatedAt).UtcDateTime);
        await contractsRepository.AddAsync(cv);
        await contractsRepository.CommitAsync();
        return cv.Id;
    }
}
