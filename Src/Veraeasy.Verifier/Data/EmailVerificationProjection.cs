namespace Veraeasy.Verifier.Data;

public sealed class EmailVerificationProjection
{
    public string EmailAddress { get; init; }

    public Guid Id { get; init; }
    public string Otp { get; init; }
    public string Secret { get; init; }
    public string? AuthToken { get; init; }
    public DateTimeOffset CreatedAt { get; init; }
}