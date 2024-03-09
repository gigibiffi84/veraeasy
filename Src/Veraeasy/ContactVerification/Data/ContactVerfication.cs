namespace Veraeasy.ContactVerification.Data;

public sealed class ContactVerification
{
    private ContactVerification(Guid id, string businessId, string emailHash, string mobileNumberHash, string owner,
        string personId, DateTimeOffset createdAt, DateTimeOffset expireAt)
    {
        Id = id;
        BusinessId = businessId;
        EmailHash = emailHash;
        MobileNumberHash = mobileNumberHash;
        CreatedAt = createdAt;
        Owner = owner;
        ExpireAt = expireAt;
        PersonId = personId;
    }

    public Guid Id { get; init; }
    public string BusinessId { get; set; }
    public string EmailHash { get; set; }
    public string MobileNumberHash { get; set; }
    public string Owner { get; init; }
    public string PersonId { get; set; }
    public DateTimeOffset CreatedAt { get; init; }
    public DateTimeOffset ExpireAt { get; init; }

    public ICollection<ContactVerificationEvent> Events { get; set; } = new List<ContactVerificationEvent>();

    public static ContactVerification PrepareEntryWithDefaultExpire(string businessId, string email, string mobile,
        string? owner, string personId, DateTimeOffset nowDate)
    {
        var cv = new ContactVerification(
            Guid.NewGuid(),
            businessId,
            email,
            mobile,
            owner!,
            personId,
            nowDate,
            nowDate.AddDays(90).UtcDateTime);
        cv.Events.Add(ContactVerificationEvent.Created(Guid.NewGuid(), businessId, owner!, personId, nowDate));
        return cv;
    }
}