using Veraeasy.EmailVerification.Controller;
using Veraeasy.EmailVerification.Data.Database;
using Veraeasy.EmailVerification.Domain.Otp;
using Veraeasy.EmailVerification.Domain.Service;
using Veraeasy.EmailVerification.Infrastructure;
using Veraeasy.EmailVerification.Infrastructure.Otp;

namespace Veraeasy.EmailVerification;

internal static class EmailVerificationModule
{
    internal static IServiceCollection AddEmailVerificationModule(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddEmailVerificationDatabase(configuration);
        services.AddScoped<EmailVerificationController>();
        services.AddScoped<IOtpService, OtpService>();
        services.AddScoped<IEmailSenderService, SimpleEmailSender>();
        return services;
    }

    internal static IApplicationBuilder UseEmailVerificationModule(this IApplicationBuilder applicationBuilder)
    {
        applicationBuilder.UseEmailVerificationDatabase();

        return applicationBuilder;
    }
}