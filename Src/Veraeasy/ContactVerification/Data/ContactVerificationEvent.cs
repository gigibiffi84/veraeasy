namespace Veraeasy.ContactVerification.Data;

public sealed class ContactVerificationEvent
{
    public enum StatusType
    {
        CREATED,
        UPDATED,
        EMAIL_SENT,
        EMAIL_VERIFIED,
        MOBILE_SENT,
        MOBILE_NUMBER_VERIFIED,
        COMPLETED
    }

    public ContactVerificationEvent(Guid id, string businessId, string personId, string owner, StatusType status,
        DateTimeOffset createdAt)
    {
        Id = id;
        BusinessId = businessId ?? throw new ArgumentNullException(nameof(businessId));
        PersonId = personId ?? throw new ArgumentNullException(nameof(personId));
        Owner = owner ?? throw new ArgumentNullException(nameof(owner));
        Status = status;
        CreatedAt = createdAt;
    }

    public ContactVerificationEvent(Guid id, string businessId, string personId, string owner, StatusType status,
        DateTimeOffset createdAt, Guid contactVerificationId)
    {
        Id = id;
        BusinessId = businessId;
        PersonId = personId;
        Owner = owner;
        Status = status;
        CreatedAt = createdAt;
        ContactVerificationId = contactVerificationId;
    }

    public Guid Id { get; init; }

    public string BusinessId { get; init; }

    public string PersonId { get; init; }

    public string Owner { get; init; }

    public StatusType Status { get; init; }

    public DateTimeOffset CreatedAt { get; init; }

    public Guid ContactVerificationId { get; set; } // Optional foreign key property

    public static ContactVerificationEvent Created(Guid id, string businessId,
        string owner, string personId, DateTimeOffset nowDate)
    {
        return new ContactVerificationEvent(id, businessId, personId, owner, StatusType.CREATED, nowDate);
    }

    public static ContactVerificationEvent Updated(Guid id, Guid contactId, string businessId,
        string owner, string personId, DateTimeOffset nowDate)
    {
        return new ContactVerificationEvent(id, businessId, personId, owner, StatusType.UPDATED, nowDate, contactId);
    }
}