using System.Security.Claims;
using Veraeasy.ContactVerification.Domain.CreateContactVerification;

namespace Veraeasy.ContactVerification.Application;


public sealed record CreateContactVerificationRequest(
    string BusinessId,
    string Email,
    string MobileNumber,
    string PersonId,
    string CreatedAt)
{

    public CreateContactVerificationCommand ToCommand(ref ClaimsPrincipal user)
        => new(BusinessId, Email, MobileNumber, PersonId, user, CreatedAt);

}

