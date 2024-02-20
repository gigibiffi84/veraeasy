namespace Veraeasy.ContactVerification.Domain.CreateContactVerification;

using Veraeasy.Common.Cqrs;

public sealed record CreateContactVerificationCommand(
    string BusinessId,
    string Email,
    string MobileNumber,
    string CreatedAt) : ICommand<Guid>
{
    public ContactVerificationCreatedDomainEvent ToDomainEvent(Guid guid)
        => new()
    {
        VerificationId = guid
    };
}

