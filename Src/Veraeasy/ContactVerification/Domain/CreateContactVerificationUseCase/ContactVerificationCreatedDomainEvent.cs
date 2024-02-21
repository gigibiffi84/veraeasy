using Veraeasy.Common.Events;
using Veraeasy.Core.IIntegrationEvents;

namespace Veraeasy.ContactVerification.Domain.CreateContactVerification;

public class ContactVerificationCreatedDomainEvent : IDomainEvent, IOutsourcedEvent<ContactVerificationEvent>
{
    public Guid VerificationId {get; init;}

    public ContactVerificationEvent toIntegrationEvent(){
        return new ContactVerificationEvent(VerificationId,DateTimeOffset.Now, ContactVerificationEventType.CREATED);
    }

    public override string ToString()
    {
        return VerificationId.ToString();
    }


}