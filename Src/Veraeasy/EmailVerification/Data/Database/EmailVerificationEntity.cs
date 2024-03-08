namespace Veraeasy.EmailVerification.Data;

public sealed class EmailVerificationEntity
{
    private EmailVerificationEntity(
        Guid id,
        string emailAddress,
        string secret,
        string otp,
        string authToken,
        string owner,
        string contactId,
        DateTimeOffset createdAt, bool verified)
    {
        Id = id;
        EmailAddress = emailAddress;
        Otp = otp;
        Secret = secret;
        AuthToken = authToken;
        CreatedAt = createdAt;
        Verified = verified;
        Owner = owner;
        ContactId = contactId;
    }

    public Guid Id { get; init; }
    public string EmailAddress { get; init; }
    public string Otp { get; init; }
    public string Secret { get; init; }
    public string AuthToken { get; init; }

    public string ContactId { get; init; }

    public string Owner { get; init; }
    public DateTimeOffset CreatedAt { get; init; }
    public bool Verified { get; init; }

    public static EmailVerificationEntity PrepareEmailVerificationSlot(string emailAddress, string secret, string otp,
        string authToken, string owner, string contactId, DateTimeOffset createdAt)
    {
        var e = new EmailVerificationEntity(
            Guid.NewGuid(),
            emailAddress,
            secret,
            otp,
            authToken,
            owner,
            contactId,
            createdAt,
            false);

        return e;
    }
}