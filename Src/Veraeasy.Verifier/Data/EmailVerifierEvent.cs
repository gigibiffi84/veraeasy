namespace Veraeasy.Verifier.Data;

public sealed class EmailVerifierEvent
{
    private EmailVerifierEvent(Guid id, string emailAddress, string emailVerificationUuid)
    {
        Id = id;
        EmailAddress = emailAddress;
        EmailVerificationUuid = emailVerificationUuid;
    }

    public Guid Id { get; init; }

    public string EmailAddress { get; init; }

    public string EmailVerificationUuid { get; init; }

    public static EmailVerifierEvent createEvent(string email, string uuid)
    {
        return new EmailVerifierEvent(Guid.NewGuid(), email, uuid);
    }
}