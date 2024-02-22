using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Veraeasy.EmailVerification.Data;

public sealed class EmailVerificationEntity
{
    public Guid Id { get; init; }
    public string EmailAddress { get; init; }
    public string Otp { get; init; }
    public string Secret { get; init; }
    public string? AuthToken { get; init; }
    public DateTimeOffset CreatedAt { get; init; }
    public bool Verified { get; init; }


    private EmailVerificationEntity(Guid id, string emailAddress, string secret, string otp, string authToken, DateTimeOffset createdAt, bool verified)
    {
        Id = id;
        EmailAddress = emailAddress;
        Otp = otp;
        Secret = secret;
        AuthToken = authToken;
        CreatedAt = createdAt;
        Verified = verified;
    }

    private EmailVerificationEntity(Guid id, string emailAddress, string secret, string otp, DateTimeOffset createdAt)
    {
        Id = id;
        EmailAddress = emailAddress;
        Secret = secret;
        Otp = otp;
        CreatedAt = createdAt;
        Verified = false;
    }

    public static EmailVerificationEntity PrepareEmailVerificationSlot(string emailAddress, string secret, string otp, DateTimeOffset createdAt)
    {
        var e = new EmailVerificationEntity(
            Guid.NewGuid(),
            emailAddress,
            secret,
            otp,
            "",
            createdAt,
            false);

        return e;
    }



}
