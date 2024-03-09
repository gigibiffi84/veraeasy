using FluentValidation;

namespace Veraeasy.ContactVerification.Application.UpdateEndpoint;

internal sealed class UpdateContactVerificatonRequestValidator : AbstractValidator<UpdateContactVerificationRequest>
{
    private readonly string emailPattern = @"^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$";

    private readonly string phonePattern =
        @"^([+]39)?((38[{8,9}|0])|(34[{7-9}|0])|(36[6|8|0])|(33[{3-9}|0])|(32[{8,9}]))([\d]{7})$";

    public UpdateContactVerificatonRequestValidator()
    {
        RuleFor(request => request.ContactId).NotEmpty();
        RuleFor(request => request.Email).NotEmpty();
        RuleFor(request => request.MobileNumber).NotEmpty();
        RuleFor(request => request.BusinessId).NotEmpty();
        RuleFor(request => request.Email).Matches(emailPattern);
        RuleFor(request => request.MobileNumber).Matches(phonePattern);
        RuleFor(request => request.Email).EmailAddress();
    }
}