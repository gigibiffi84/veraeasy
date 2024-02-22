namespace Veraeasy.EmailVerification.Controller;

using FluentValidation;

internal sealed class EmailVerificatonRequestValidator : AbstractValidator<StartEmailVerificationRequest>
{
    private readonly string emailPattern = @"^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$";

    public EmailVerificatonRequestValidator()
    {
        DateTimeOffset res = DateTimeOffset.UtcNow;
        RuleFor(request => request.Email).NotEmpty();
        RuleFor(request => request.CreatedAt).NotEmpty();
        RuleFor(request => request.CreatedAt).Must(createdAt => DateTimeOffset.TryParse(createdAt, out res));
        RuleFor(request => request.Email).Matches(emailPattern);
        RuleFor(request => request.Email).EmailAddress();
    }
}