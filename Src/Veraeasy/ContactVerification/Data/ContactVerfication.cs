using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Veraeasy.ContactVerification.Data;

public sealed class ContactVerification
{
    public Guid Id { get; init; }
    public string BusinessId {get; init;}
    public string EmailHash { get; init; }
    public string MobileNumberHash { get; init; }
    public string Owner { get; init; }
    public DateTimeOffset CreatedAt { get; init; }
    public DateTimeOffset ExpireAt { get; init; }

    //TODO: add ContactVerificationStatus The status is a FSM: IDLE,EXPIRED,VERIFIED.


    private ContactVerification(Guid id, string businessId,  string emailHash, string mobileNumberHash, string owner, DateTimeOffset createdAt, DateTimeOffset expireAt)
    {
        Id = id;
        BusinessId = businessId;
        EmailHash = emailHash;
        MobileNumberHash = mobileNumberHash;
        CreatedAt = createdAt;
        Owner = owner;
        ExpireAt = expireAt;
    }

    public static ContactVerification PrepareEntryWithDefaultExpire(string businessId, string email, string mobile, string? owner, DateTimeOffset nowDate)
    {
        var cv = new ContactVerification(
            Guid.NewGuid(),
            businessId,
            email,
            mobile,
            owner!,
            nowDate,
            nowDate.AddDays(90).UtcDateTime);
        return cv;
    }
}
