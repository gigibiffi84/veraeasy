using System.Security.Claims;
using Veraeasy.Common.Cqrs;

namespace Veraeasy.EmailVerification.Domain.PrepareEmailVerification;


public sealed record PrepareEmailVerificationCommand(
    string Email): ICommand<Guid>
{



}

