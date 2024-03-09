using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Data;

namespace Veraeasy.ContactVerification.Domain.Features.CreateContactVerificationUseCase;

[UsedImplicitly]
internal sealed class CreateContactVerificationCommandHandler(
    IContactVerificationRepository contractsRepository,
    ILogger<CreateContactVerificationCommandHandler> logger) : ICommandHandler<CreateContactVerificationCommand, Guid>
{
    public async Task<Guid> Handle(CreateContactVerificationCommand cmd, CancellationToken cancellationToken)
    {
        if (cmd is not null)
        {
            logger.LogInformation($"Received command {cmd.GetType().Name} from {cmd.User?.Identity?.Name}");
            var cv = Data.ContactVerification.PrepareEntryWithDefaultExpire(
                cmd.BusinessId,
                cmd.Email,
                cmd.MobileNumber,
                cmd.User is null ? "anonymous" : cmd?.User?.Identity?.Name,
                cmd.PersonId,
                DateTimeOffset.UtcNow
            );
            await contractsRepository.AddAsync(cv);
            await contractsRepository.CommitAsync();
            return cv.Id;
        }

        return Guid.Empty;
    }
}