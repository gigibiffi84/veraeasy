using Veraeasy.Common.Cqrs;

namespace Veraeasy.ContactVerification.CreateContactVerification;

public sealed record CreateContactVerificationCommand(
    string BusinessId,
    string Email,
    string MobileNumber,
    string CreatedAt) : ICommand<Guid>;