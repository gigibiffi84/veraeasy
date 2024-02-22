using Veraeasy.Common.Cqrs;
using Veraeasy.EmailVerification.Data;
using Veraeasy.EmailVerification.Data.Database.Repositories;
using Veraeasy.EmailVerification.Domain.Otp;

namespace Veraeasy.EmailVerification.Domain.PrepareEmailVerification;

[UsedImplicitly]
internal sealed class PrepareEmailVerificationCommandHandler
    (
        IEmailVerificationRepository repository,
        ILogger<PrepareEmailVerificationCommandHandler> logger,
        IOtpService otpService,
        TimeProvider timeProvider ) : ICommandHandler<PrepareEmailVerificationCommand, Guid>
{
    public async Task<Guid> Handle(PrepareEmailVerificationCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"creating new item with id {request.Email}", request);
        var secret = Guid.NewGuid().ToString();
        var otp = otpService.generateOtp(secret);
        var slot = EmailVerificationEntity.PrepareEmailVerificationSlot(request.Email, secret, otp, timeProvider.GetUtcNow());
        await repository.AddAsync(slot);
        return slot.Id;
    }
}