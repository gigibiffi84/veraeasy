using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Veraeasy.EmailVerification.Data;

public sealed class EmailVerificationEntity
{
    public Guid Id { get; init; }
    public string EmailAddress { get; init; }
    public string Otp { get; init; }
    public string AuthToken { get; init; }
    public DateTimeOffset CreatedAt { get; init; }
    public bool Verified { get; init; }


    public EmailVerificationEntity(Guid id, string emailAddress, string otp, string authToken, DateTimeOffset createdAt, bool verified)
    {
        Id = id;
        EmailAddress = emailAddress;
        Otp = otp;
        AuthToken = authToken;
        CreatedAt = createdAt;
        Verified = verified;
    }




}
