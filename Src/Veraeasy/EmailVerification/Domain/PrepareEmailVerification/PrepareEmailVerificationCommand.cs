using Veraeasy.Common.Cqrs;

namespace Veraeasy.EmailVerification.Domain.PrepareEmailVerification;

public sealed record PrepareEmailVerificationCommand(
    string Email,
    string? Owner,
    string ContactId) : ICommand<Guid>
{
}