using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Domain.Model;

namespace Veraeasy.ContactVerification.Domain.Features.UpdateContactVerificationUseCase;

public record UpdateContactVerificationCommand(
    Guid ContactId,
    string BusinessId,
    string Email,
    string MobileNumber,
    string Owner,
    string PersonId)
    : ICommand<ContactVerificationStatus>;