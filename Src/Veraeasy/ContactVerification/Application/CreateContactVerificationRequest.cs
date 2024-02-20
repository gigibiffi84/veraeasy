using Veraeasy.ContactVerification.Domain.CreateContactVerification;

namespace Veraeasy.ContactVerification.Application;


public sealed record CreateContactVerificationRequest(
    string BusinessId,
    string Email,
    string MobileNumber,
    string CreatedAt)
{

    public CreateContactVerificationCommand ToCommand() => new(BusinessId, Email, MobileNumber, CreatedAt);

}

