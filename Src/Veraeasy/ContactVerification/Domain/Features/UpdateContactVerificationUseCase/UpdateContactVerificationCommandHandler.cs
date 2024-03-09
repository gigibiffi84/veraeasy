using Veraeasy.Common.Cqrs;
using Veraeasy.ContactVerification.Data;
using Veraeasy.ContactVerification.Domain.Model;

namespace Veraeasy.ContactVerification.Domain.Features.UpdateContactVerificationUseCase;

internal sealed class
    UpdateContactVerificationCommandHandler(
        IContactVerificationRepository contactVerificationRepository,
        ILogger<UpdateContactVerificationCommandHandler> logger) : ICommandHandler<UpdateContactVerificationCommand,
    ContactVerificationStatus>
{
    public async Task<ContactVerificationStatus> Handle(UpdateContactVerificationCommand request,
        CancellationToken cancellationToken)
    {
        var updateRecord = new ContactVerificationUpdate(
            request.BusinessId,
            request.Email,
            request.MobileNumber,
            request.Owner,
            request.PersonId);

        await contactVerificationRepository.UpdateContactVerificationAsync(request.ContactId, updateRecord,
            cancellationToken);
        var result = new ContactVerificationStatus
        {
            BusinessId = request.BusinessId,
            PersonId = request.PersonId,
            Id = request.ContactId
        };
        return result;
    }
}