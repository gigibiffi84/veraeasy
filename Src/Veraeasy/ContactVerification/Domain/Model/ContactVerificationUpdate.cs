namespace Veraeasy.ContactVerification.Domain.Model;

public sealed record ContactVerificationUpdate(
    string BusinessId,
    string Email,
    string MobileNumber,
    string Owner,
    string PersonId)
{
}