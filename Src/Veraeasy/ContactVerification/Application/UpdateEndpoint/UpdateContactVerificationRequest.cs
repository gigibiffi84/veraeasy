using System.Security.Claims;
using Veraeasy.ContactVerification.Domain.Features.UpdateContactVerificationUseCase;

namespace Veraeasy.ContactVerification.Application.UpdateEndpoint;

public sealed record UpdateContactVerificationRequest(
    string ContactId,
    string BusinessId,
    string Email,
    string MobileNumber,
    string PersonId)
{
    public UpdateContactVerificationCommand ToCommand(ref ClaimsPrincipal user)
    {
        return new UpdateContactVerificationCommand(new Guid(ContactId), BusinessId, Email, MobileNumber,
            user.Identity.Name, PersonId);
    }
}