using Veraeasy.Verifier.EmailVerification.Data.Database;
using Veraeasy.Verifier.EmailVerifier.Service;

namespace Veraeasy.Verifier.EmailVerifier;

internal static class ContactVerificationModule
{
    internal static IServiceCollection AddEmailVerifier(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddEmailVerificationDatabase(configuration);

        services.AddScoped<IOtpVerifier, OtpVerifier>();

        AddMapper();
        return services;
    }

    internal static void AddMapper()
    {
        //TODO: add missing tinymapper mappers
    }

    internal static IApplicationBuilder UseEmailVerifier(this IApplicationBuilder applicationBuilder)
    {
        applicationBuilder.UseEmailVerificationDatabase();

        return applicationBuilder;
    }
}