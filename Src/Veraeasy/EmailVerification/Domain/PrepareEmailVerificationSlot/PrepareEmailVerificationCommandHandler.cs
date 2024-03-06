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
    TimeProvider timeProvider) : ICommandHandler<PrepareEmailVerificationCommand, Guid>
{
    public async Task<Guid> Handle(PrepareEmailVerificationCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation($"creating new item with id {request.Email}", request);
        var secret = Guid.NewGuid().ToString();
        var otp = otpService.generateOtp(secret);
        var token = await authService.generateAuthToken(new UserCredentials("veraeasy", "12345678"));
        var slot = EmailVerificationEntity.PrepareEmailVerificationSlot(request.Email, secret, otp, token.access_token,
            timeProvider.GetUtcNow());
        var msg = $"Use this otp to verify your email address: {otp}";
        await repository.AddAsync(slot);
        var link = $"http://localhost:5173/otp/{slot.Id}";
        senderService.sendEmail(request.Email, "Vereasy otp verification", msg, link);
        return slot.Id;
    }
}