using Veraeasy.Common.Cqrs;
using Veraeasy.EmailVerification.Data;
using Veraeasy.EmailVerification.Data.Database.Repositories;
using Veraeasy.EmailVerification.Domain.Model;
using Veraeasy.EmailVerification.Domain.Otp;
using Veraeasy.EmailVerification.Domain.Service;

namespace Veraeasy.EmailVerification.Domain.PrepareEmailVerification;

[UsedImplicitly]
internal sealed class PrepareEmailVerificationCommandHandler(
    IEmailVerificationRepository repository,
    ILogger<PrepareEmailVerificationCommandHandler> logger,
    IOtpService otpService,
    IAuthService authService,
    IEmailSenderService senderService,
    OwnerUserCredentilasMapping ownerUserCredentilasMapping,
    TimeProvider timeProvider) : ICommandHandler<PrepareEmailVerificationCommand, Guid>
{
    public async Task<Guid> Handle(PrepareEmailVerificationCommand request, CancellationToken cancellationToken)
    {
        var owner = request.Owner ?? throw new InvalidOperationException("owner can't be null");
        logger.LogInformation($"creating new item with id {request.Email}", request);
        var ownerConfiguration = ownerUserCredentilasMapping.getOwnerConfiguration(owner);
        var secret = Guid.NewGuid().ToString();
        var otp = otpService.generateOtp(secret);
        var token = await authService.generateAuthToken(request.Owner);
        var slot = EmailVerificationEntity.PrepareEmailVerificationSlot(
            request.Email,
            secret,
            otp,
            token.access_token,
            request.Owner,
            request.ContactId,
            timeProvider.GetUtcNow());
        await repository.AddAsync(slot, cancellationToken);
        var msg = ownerConfiguration.GetTemplateInterpolation(slot.Id.ToString(), otp, token.access_token);
        senderService.sendEmail(request.Owner, request.Email, "Veraeasy otp verification", msg);
        return slot.Id;
    }
}