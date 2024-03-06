using FluentValidation;

namespace Veraeasy.EmailVerification.Controller;

internal sealed class EmailVerificatonRequestValidator : AbstractValidator<StartEmailVerificationRequest>
{
    private readonly string EmailPattern = @"^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$";

    public EmailVerificatonRequestValidator()
    {
        var res = DateTimeOffset.UtcNow;
        RuleFor(request => request.Email).NotEmpty();
        //RuleFor(request => request.CreatedAt).NotEmpty();
        //RuleFor(request => request.CreatedAt).Must(createdAt => DateTimeOffset.TryParse(createdAt, out res));
        RuleFor(request => request.Email).Matches(EmailPattern);
        RuleFor(request => request.Email).EmailAddress();
    }
}