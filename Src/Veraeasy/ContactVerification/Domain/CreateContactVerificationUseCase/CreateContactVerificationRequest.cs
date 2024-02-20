namespace Veraeasy.ContactVerification.CreateContactVerification;

public sealed record CreateContactVerificationRequest(
    string BusinessId,
    string Email,
    string MobileNumber,
    string CreatedAt)
{

    public CreateContactVerificationCommand ToCommand() => new(BusinessId, Email, MobileNumber, CreatedAt);

}

