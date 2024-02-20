namespace Veraeasy.ContactVerification.ContactVerificationCreated;

public sealed record CreateContactVerificationRequest(
    string BusinessId,
    string Email,
    string MobileNumber,
    string CreatedAt);