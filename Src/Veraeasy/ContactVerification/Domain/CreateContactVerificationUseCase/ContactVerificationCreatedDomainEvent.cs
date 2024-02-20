namespace Veraeasy.ContactVerification.Domain.CreateContactVerification;

public class ContactVerificationCreatedDomainEvent : IDomainEvent
{
    public Guid VerificationId {get; init;}
}