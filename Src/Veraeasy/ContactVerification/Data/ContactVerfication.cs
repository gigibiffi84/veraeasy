namespace Veraeasy.ContactVerification.Data;

internal sealed class ContactVerification
{
    public Guid Id { get; init; }
    public string EmailHash { get; init; }
    public string MobileNumberHash { get; init; }
    public DateTimeOffset CreatedAt { get; init; }
    public DateTimeOffset ExpireAt { get; init; }

    //TODO: add ContactVerificationStatus The status is a FSM: IDLE,EXPIRED,VERIFIED.


    private ContactVerification(Guid id, string emailHash, string mobileNumberHash, DateTimeOffset createdAt, DateTimeOffset ExpireAt)
    {
        Id = id;
        EmailHash = emailHash;
        MobileNumberHash = mobileNumberHash;
        CreatedAt = createdAt;
    }

    internal static ContactVerification PrepareEntryWithDefaultExpire(string email, string mobile, DateTimeOffset nowDate)
    {
        const decimal standardDiscount = 0.1m;
        var offer = new ContactVerification(
            Guid.NewGuid(),
            email,
            mobile,
            nowDate,
            nowDate.AddDays(90));

        return offer;
    }
}
