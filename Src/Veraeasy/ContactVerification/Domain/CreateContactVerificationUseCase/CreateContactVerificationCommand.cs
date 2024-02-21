namespace Veraeasy.ContactVerification.Domain.CreateContactVerification;

using System.Security.Claims;
using Veraeasy.Common.Cqrs;

public sealed record CreateContactVerificationCommand(
    string BusinessId,
    string Email,
    string MobileNumber,
    ClaimsPrincipal User,
    string CreatedAt) : ICommand<Guid>
{
    public ContactVerificationCreatedDomainEvent ToDomainEvent(Guid guid)
        => new()
    {
        VerificationId = guid
    };
}

