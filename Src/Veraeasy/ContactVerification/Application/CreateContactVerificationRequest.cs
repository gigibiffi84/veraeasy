using System.Security.Claims;
using Veraeasy.ContactVerification.Domain.CreateContactVerification;

namespace Veraeasy.ContactVerification.Application;


public sealed record CreateContactVerificationRequest(
    string BusinessId,
    string Email,
    string MobileNumber,
    string CreatedAt)
{

    public CreateContactVerificationCommand ToCommand(ref ClaimsPrincipal user)
        => new(BusinessId, Email, MobileNumber, user, CreatedAt);

}

