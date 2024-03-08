namespace Veraeasy.Verifier.EmailVerifier.Controller;

public class EmailVerifierResponse
{
    public EmailVerifierResponse(string emailAddress, string? authToken, DateTimeOffset createdAt)
    {
        EmailAddress = emailAddress;
        AuthToken = authToken;
        CreatedAt = createdAt;
    }

    public string EmailAddress { get; init; }
    public string? AuthToken { get; init; }
    public DateTimeOffset CreatedAt { get; init; }
}