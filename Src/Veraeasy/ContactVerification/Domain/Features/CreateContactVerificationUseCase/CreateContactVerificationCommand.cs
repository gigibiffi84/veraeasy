using System.Security.Claims;
using Veraeasy.Common.Cqrs;

namespace Veraeasy.ContactVerification.Domain.Features.CreateContactVerificationUseCase;

public sealed record CreateContactVerificationCommand(
    string BusinessId,
    string Email,
    string MobileNumber,
    string PersonId,
    ClaimsPrincipal User,
    string CreatedAt) : ICommand<Guid>
{
    public ContactVerificationCreatedDomainEvent ToDomainEvent(Guid guid)
    {
        return new ContactVerificationCreatedDomainEvent
        {
            VerificationId = guid
        };
    }
}