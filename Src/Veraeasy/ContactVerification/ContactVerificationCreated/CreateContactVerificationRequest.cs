namespace Veraeasy.ContactVerification.ContactVerificationCreated;

public sealed record CreateContactVerificationRequest(string businessId, string email, string mobileNumber, DateTimeOffset createdAt);