using Veraeasy.EmailVerification.Controller;
using Veraeasy.EmailVerification.Data.Database;
using Veraeasy.EmailVerification.Domain.Otp;

namespace Veraeasy.EmailVerification;

internal static class EmailVerificationModule
{
    internal static IServiceCollection AddEmailVerificationModule(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddEmailVerificationDatabase(configuration);
        services.AddScoped<EmailVerficationController>();
        services.AddScoped<IOtpService, OtpService>();
        return services;
    }

    internal static IApplicationBuilder UseEmailVerificationModule(this IApplicationBuilder applicationBuilder)
    {
        applicationBuilder.UseEmailVerificationDatabase();

        return applicationBuilder;
    }
}
