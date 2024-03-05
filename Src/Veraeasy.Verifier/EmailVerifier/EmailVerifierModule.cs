using Veraeasy.Verifier.EmailVerification.Data.Database;

namespace Veraeasy.Verifier.EmailVerifier;

internal static class ContactVerificationModule
{
    internal static IServiceCollection AddEmailVerifier(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddEmailVerificationDatabase(configuration);

        //TODO: add missin transient or scoped services.AddScoped<ContactVerficationQueryController>();

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