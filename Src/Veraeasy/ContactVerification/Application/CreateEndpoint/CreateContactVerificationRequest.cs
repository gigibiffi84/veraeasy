using System.Security.Claims;
using Veraeasy.ContactVerification.Domain.Features.CreateContactVerificationUseCase;

namespace Veraeasy.ContactVerification.Application.CreateEndpoint;

public sealed record CreateContactVerificationRequest(
    string BusinessId,
    string Email,
    string MobileNumber,
    string PersonId,
    string CreatedAt)
{
    public CreateContactVerificationCommand ToCommand(ref ClaimsPrincipal user)
    {
        return new CreateContactVerificationCommand(BusinessId, Email, MobileNumber, PersonId, user, CreatedAt);
    }
}