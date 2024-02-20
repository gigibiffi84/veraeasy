namespace Veraeasy.ContactVerification.Data;

internal sealed class ContactVerification
{
    public Guid Id { get; init; }
    public string BusinessId {get; init;}
    public string EmailHash { get; init; }
    public string MobileNumberHash { get; init; }
    public DateTimeOffset CreatedAt { get; init; }
    public DateTimeOffset ExpireAt { get; init; }

    //TODO: add ContactVerificationStatus The status is a FSM: IDLE,EXPIRED,VERIFIED.


    private ContactVerification(Guid id, string businessId,  string emailHash, string mobileNumberHash, DateTimeOffset createdAt, DateTimeOffset ExpireAt)
    {
        Id = id;
        BusinessId = businessId;
        EmailHash = emailHash;
        MobileNumberHash = mobileNumberHash;
        CreatedAt = createdAt;
    }

    internal static ContactVerification PrepareEntryWithDefaultExpire(string businessId, string email, string mobile, DateTimeOffset nowDate)
    {
        var cv = new ContactVerification(
            Guid.NewGuid(),
            businessId,
            email,
            mobile,
            nowDate,
            nowDate.AddDays(90));

        return cv;
    }
}
